
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

  
function toQuery(params = {}) {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
    )
    .join("&");

  return qs ? `?${qs}` : "";
}


async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },

   
    body: body !== undefined ? JSON.stringify(body) : undefined,


    credentials: "include",
  });


  if (!res.ok) {
    let message = `HTTP ${res.status}`;

    
    try {
      const err = await res.json();
      message = err?.message || message;
    } catch {
     
    }

    throw new Error(message);
  }

  
  if (res.status === 204) return null;

 
  return res.json();
}


export const api = {
 

  submitTestResult: ({ roomCode, questionId, roomUserId, opinion }) =>
    request(`/room/test/result`, {
      method: "POST",
      body: {
        roomCode,
        questionId: String(questionId),
        roomUserId: String(roomUserId),
        opinion,
      },
    }),

 
  pollTestResult: ({ roomCode, userId }) =>
    request(
      `/room/${encodeURIComponent(roomCode)}/test/result${toQuery({ userId })}`,
      { method: "GET" }
    ),

  postMatchReady: ({ userId, roomCode }) =>
    request(`/room/match`, {
      method: "POST",
      body: { userId: String(userId), roomCode },
    }),


  pollMatchReady: ({ roomCode, userId }) =>
    request(
      `/room/${encodeURIComponent(roomCode)}/match${toQuery({ userId })}`,
      { method: "GET" }
    ),

  
  saveAgreedRuleByHost: ({ roomCode, questionId, opinion }) =>
    request(`/room/leadermismatch`, {
      method: "POST",
      body: {
        roomCode,
        questionId: String(questionId),
        opinion,
      },
    }),

  postAfterMismatchReady: ({ userId, roomCode }) =>
    request(`/room/aftermismatch`, {
      method: "POST",
      body: { userId: String(userId), roomCode },
    }),

  pollAfterMismatchReady: ({ roomCode, userId }) =>
    request(
      `/room/${encodeURIComponent(roomCode)}/aftermismatch${toQuery({ userId })}`,
      { method: "GET" }
    ),

 
  getTestSummary: ({ roomCode, userId }) =>
    request(
      `/room/${encodeURIComponent(roomCode)}/test/summary${toQuery({ userId })}`,
      { method: "GET" }
    ),


  addRuleInSummaryByHost: ({
    roomCode,
    questionId,
    userId,
    opinion,
    category,
  }) =>
    request(`/room/test/summary`, {
      method: "POST",
      body: {
        roomCode,
        questionId: String(questionId),
        userId: String(userId),
        opinion,
        category,
      },
    }),

  
    
  updateRuleInSummaryByHost: ({ roomCode, questionId, userId, opinion }) =>
    request(`/room/${encodeURIComponent(roomCode)}/test/summary`, {
      method: "PUT",
      body: {
        questionId: String(questionId),
        userId: String(userId),
        opinion,
      },
    }),

  goToFinalPageByHost: ({ roomCode, userId }) =>
    request(`/room/test/summary`, {
      method: "POST",
      body: { roomCode, userId: String(userId) },
    }),

  getFinalRules: ({ roomCode, userId }) =>
    request(
      `/room/${encodeURIComponent(roomCode)}/test/final${toQuery({ userId })}`,
      { method: "GET" }
    ),

  
  selectHouseIcon: ({ roomCode, userId }) =>
    request(`/room/test/move`, {
      method: "POST",
      body: { roomCode, userId: String(userId) },
    }),

  
  getBoardRoomInfo: ({ roomCode }) =>
    request(`/room/${encodeURIComponent(roomCode)}/board/roomInfo`, {
      method: "GET",
    }),


  getBoardFinalRules: ({ roomCode }) =>
    request(`/room/${encodeURIComponent(roomCode)}/board/final`, {
      method: "GET",
    }),

  
  goEditRulesFromBoardByHost: ({ roomCode, userId }) =>
    request(`/room/${encodeURIComponent(roomCode)}/board/final`, {
      method: "POST",
      body: { userId: String(userId) },
    }),

  updateRoomNameByHost: ({ roomCode, updateRname }) =>
    request(`/room/${encodeURIComponent(roomCode)}/board/updateRname`, {
      method: "PUT",
      body: { updateRname },
    }),

  
  deleteRoomByHost: ({ roomCode, userId }) =>
    request(`/room/${encodeURIComponent(roomCode)}`, {
      method: "DELETE",
      body: { userId: String(userId) },
    }),

  
  createOpinion: ({ roomCode, content }) =>
    request(`/room/opinions/create`, {
      method: "POST",
      body: { content, roomCode },
    }),

  getOpinions: ({ roomCode }) =>
    request(`/room/${encodeURIComponent(roomCode)}/opinions`, {
      method: "GET",
    }),
};
