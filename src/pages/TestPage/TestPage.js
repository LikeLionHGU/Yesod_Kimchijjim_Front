
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import { QUESTION_DATA } from "../../constants/questions";
import ProgressBar from "../../components/common/ProgressBar";
import Button from "../../components/common/Button";
import QuestionCard from "../../components/QuestionCard";
import { api } from "../../utils/api";

function TestPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteStatus, setVoteStatus] = useState(null);

  useEffect(() => {
    const startIndex = location.state?.startIndex;
    if (typeof startIndex === "number") {
      setCurrentIndex(startIndex);
      // navigate("/room/test", { replace: true });
    }
  }, [location.state]);

  const totalQuestions = QUESTION_DATA.length;
  const currentQuestion = QUESTION_DATA[currentIndex] || null;

  const questionId = currentQuestion?.id ?? null;
  const nextIndex = currentIndex + 1;
  const isMultiSelect = questionId === 4;

  const payload = useMemo(
    () => ({
      questionId,
      nextIndex,
      totalQuestions,
      questionIndex: currentIndex,
      category: currentQuestion?.category,
    }),
    [questionId, nextIndex, totalQuestions, currentIndex, currentQuestion]
  );

  useEffect(() => {
    setSelectedOptionIds([]);
    setHasSubmitted(false);
    setIsSubmitting(false);
    setVoteStatus(null);
  }, [questionId]);

  const handleSelect = (optionId) => {
    if (hasSubmitted) return;
    if (!questionId) return;

    if (isMultiSelect) {
      setSelectedOptionIds((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptionIds([optionId]);
    }
  };

  // const handleNextScreen = (res) => {
  // if (!res) return;

  // if (res.status === "WAITING") {
  //   setVoteStatus({
  //     current: res.currentVotes,
  //     total: 4,
  //   });
  //   return;
  // }

  const handleNextScreen = useCallback(
    (res) => {
      if (!res) return;

      if (res.status === "WAITING") {
        const maxPeople = Number(sessionStorage.getItem("maxPeople") || 4);
        setVoteStatus({
          current: res.currentVotes,
          total: maxPeople,
        });
        return;
      }

      const nextPayload = {
        ...payload,
        data: res?.data || [],
        amIHost: res?.amIHost,
      };

      // 방장이 규칙 확정해서 GO_AFTER_MISMATCH 신호가 들어온 경우
      if (res.status === "AFTER_MISMATCH") {
        const agreed = Array.isArray(res?.data) ? res.data[0] : "";
        navigate("/test/after-mismatch", {
          state: { ...payload, agreedRuleText: agreed },
          replace: true,
        });
        return;
      }

      if (res.status === "MATCH") {
        navigate("/test/match", { state: nextPayload, replace: true });
        return;
      }

      if (res.status === "MISMATCH") {
        navigate("/test/mismatch", { state: nextPayload, replace: true });
        return;
      }
    },
    [navigate, payload]
  );

  useEffect(() => {
    if (!hasSubmitted) return;

    const roomCode = sessionStorage.getItem("currentRoomCode") || "";
    const userIdStr = sessionStorage.getItem("userId") || "";
    const userId = userIdStr ? Number(userIdStr) : null;

    if (!roomCode || !userId) return;
    if (!questionId) return;

    const t = setInterval(async () => {
      try {
        const res = await api.pollTestResult({ roomCode, userId });
        handleNextScreen(res);
      } catch (e) {}
    }, 1000);

    return () => clearInterval(t);
  }, [hasSubmitted, questionId, handleNextScreen]);

  const handleSubmit = async () => {
    if (hasSubmitted) return;
    if (!questionId) return;
    if (selectedOptionIds.length === 0) return;

    const roomCode = sessionStorage.getItem("currentRoomCode") || "";
    const userIdStr = sessionStorage.getItem("userId") || "";
    const userId = userIdStr ? Number(userIdStr) : null;

    if (!roomCode || !userId) {
      alert("방 정보가 없습니다. 다시 입장해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const opinion = currentQuestion.options
        .filter((opt) => selectedOptionIds.includes(opt.id))
        .map((opt) => opt.text);

      const res = await api.submitTestResult({
        roomCode,
        userId,
        questionId,
        opinion,
        category: currentQuestion.category,
      });

      setHasSubmitted(true);
      handleNextScreen(res);
    } catch (e) {
      console.error(e);
      alert("서버 연결 실패. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentQuestion) {
    return (
      <Wrapper>
        <EmptyText>질문을 불러오는 중이에요...</EmptyText>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ProgressBar total={totalQuestions} current={currentIndex + 1} />

      <QuestionCard
        category={currentQuestion.category}
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedOption={selectedOptionIds}
        onSelect={handleSelect}
        isMultiSelect={isMultiSelect}
      />

      {/* {hasSubmitted && (
        <VoteText>
          {voteStatus ? (
            <>
              {voteStatus.current}번째로 투표했어요!
              <br />
              모두 투표하면 자동으로 넘어가요!
            </>
          ) : (
            <>
              투표를 제출했어요!
              <br />
              다른 사람들의 투표를 기다리는 중이에요.
            </>
          )}
        </VoteText>
      )}

      <ButtonWrap>
        <Button
          onClick={handleSubmit}
          disabled={selectedOptionIds.length === 0 || isSubmitting || hasSubmitted}
        >
          {hasSubmitted ? "투표 완료!" : "선택 완료"}
        </Button>
      </ButtonWrap> */}
      <ButtonWrap>
  <Button
    onClick={handleSubmit}
    disabled={selectedOptionIds.length === 0 || isSubmitting || hasSubmitted}
  >
    선택 완료
  </Button>

  {hasSubmitted && (
    <VoteText>
      {voteStatus ? (
        <>
          {voteStatus.current}번째로 투표했어요!
          <br />
          모두 투표하면 자동으로 넘어가요!
        </>
      ) : (
        <>
          투표를 제출했어요!
          <br />
          다른 사람들의 투표를 기다리는 중이에요.
        </>
      )}
    </VoteText>
  )}
</ButtonWrap>
    </Wrapper>
  );
}

export default TestPage;

// const Wrapper = styled.div`
//   width: 100%;
//   min-height: 100vh;
//   padding: 40px 0;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background: ${Colors.backgroundColor};
// `;

// const ButtonWrap = styled.div`
//   width: 746px;
//   display: flex;
//   justify-content: center;
//   margin-top: 20px;
// `;

const Wrapper = styled.div`

  width: 100%;
  min-height: 100vh;
  padding: 40px 0 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${Colors.backgroundColor};
  box-sizing: border-box;
`;

const ButtonWrap = styled.div`
  
  width: min(936px, calc(100% - 40px));
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

// const VoteText = styled.div`
//   margin-top: 16px;
//   font-size: 14px;
//   font-weight: 600;
//   color: ${Colors.mainPurple};
//   text-align: center;
// `;

const VoteText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${Colors.mainPurple};
  text-align: center;
  width: 100%;
`;

const EmptyText = styled.div`
  margin-top: 80px;
  color: ${Colors.fixGray};
  font-size: 14px;
`;

