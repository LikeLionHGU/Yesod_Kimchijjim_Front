
const BASE_URL = process.env.REACT_APP_HOST_URL || "";
const enc = (v) => encodeURIComponent(String(v));

async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const err = await res.json();
        message = err?.message || JSON.stringify(err) || message;
      } else {
        const text = await res.text();
        message = text || message;
      }
    } catch {}
    throw new Error(message);
  }

  if (res.status === 204) return null;

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const api = {
  // Test flow 
  submitTestResult: ({ roomCode, userId, questionId, opinion, category }) =>
    request(`/room/test/result`, {
      method: "POST",
      body: { roomCode, userId, questionId, opinion, category },
    }),

  pollTestResult: ({ roomCode, userId }) =>
    request(`/room/${enc(roomCode)}/test/result?userId=${enc(userId)}`),

  submitAndWaitTestResult: async ({
    roomCode,
    userId,
    questionId,
    opinion,
    category,
  }) => {
    let res = await api.submitTestResult({
      roomCode,
      userId,
      questionId,
      opinion,
      category,
    });

    while (res?.status === "WAITING") {
      await sleep(1200);
      res = await api.pollTestResult({ roomCode, userId });
    }
    return res;
  },

  startNextMatch: ({ roomCode, userId }) =>
    request(`/room/match`, { method: "POST", body: { roomCode, userId } }),

  confirmRule: ({ roomCode, userId, questionId, opinion, category }) =>
    request(`/room/rule/confirm`, {
      method: "POST",
      body: { roomCode, userId, questionId, opinion, category },
    }),

  startNextMismatch: ({ roomCode, userId }) =>
    request(`/room/rule/confirm/mismatch`, {
      method: "POST",
      body: { roomCode, userId },
    }),

  // 룰 요약(최종 룰 목록도 여기서 내려옴)
  getRuleSummary: ({ roomCode, userId }) =>
    request(`/room/${enc(roomCode)}/test/summary?userId=${enc(userId)}`),

  // Final 페이지에서도 동일 API 재사용
  getFinalRules: ({ roomCode, userId }) =>
    request(`/room/${enc(roomCode)}/test/summary?userId=${enc(userId)}`),

  addRuleToSummary: ({ roomCode, userId, questionId, opinion }) =>
    request(`/room/test/summary`, {
      method: "POST",
      body: { roomCode, userId, questionId, opinion: [opinion] },
    }),

  updateSummaryRuleById: ({ roomCode, userId, ruleId, opinion }) =>
    request(`/room/test/summary/${enc(ruleId)}`, {
      method: "PUT",
      body: { roomCode, userId, opinion: [opinion] },
    }),

  goFinalPage: ({ roomCode, userId }) =>
    request(`/room/test/summary/complete`, {
      method: "POST",
      body: { roomCode, userId },
    }),

  // Board opinionSection
  // 전체 의견 불러오기
  getOpinions: ({ roomCode }) =>
    request(`/room/${enc(roomCode)}/opinions`, { method: "GET" }),

  // 의견 등록
  createOpinion: ({ roomCode, content }) =>
    request(`/room/opinions/create`, {
      method: "POST",
      body: { roomCode, content },
    }),
};
