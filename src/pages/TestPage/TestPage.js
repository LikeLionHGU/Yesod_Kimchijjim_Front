// import { useEffect, useMemo, useState } from "react";
// import styled from "styled-components";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Colors } from "../../styles/colors";
// import { QUESTION_DATA } from "../../constants/questions";
// import ProgressBar from "../../components/common/ProgressBar";
// import Button from "../../components/common/Button";
// import QuestionCard from "../../components/QuestionCard";
// import { api } from "../../utils/api";
// import { useRoom } from "../../context/RoomContext";

// function TestPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { roomCode, userId } = useRoom();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedOptionIds, setSelectedOptionIds] = useState([]);

//   // 제출 버튼 한 번만 누르게
//   const [hasSubmitted, setHasSubmitted] = useState(false);

//   // 제출 중 표시
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // 내 제출 직후에만 보여줄 “현재 n명 투표”
//   const [voteStatus, setVoteStatus] = useState(null);

//   useEffect(() => {
//     const startIndex = location.state?.startIndex;
//     if (typeof startIndex === "number") {
//       setCurrentIndex(startIndex);
//       navigate("/test", { replace: true });
//     }
//   }, [location.state, navigate]);

//   const currentQuestion = QUESTION_DATA[currentIndex];
//   const totalQuestions = QUESTION_DATA.length;

//   if (!currentQuestion) return null;

//   const questionId = currentQuestion.id;
//   const nextIndex = currentIndex + 1;
//   const isMultiSelect = questionId === 4;

//   const payload = useMemo(
//     () => ({
//       questionId,
//       nextIndex,
//       totalQuestions,
//       questionIndex: currentIndex,
//     }),
//     [questionId, nextIndex, totalQuestions, currentIndex]
//   );

//   // 질문이 바뀌면 초기화
//   useEffect(() => {
//     setSelectedOptionIds([]);
//     setHasSubmitted(false);
//     setIsSubmitting(false);
//     setVoteStatus(null);
//   }, [questionId]);

//   const handleSelect = (optionId) => {
//     // 제출 후에는 선택 변경 못하게 잠금
//     if (hasSubmitted) return;

//     if (isMultiSelect) {
//       setSelectedOptionIds((prev) =>
//         prev.includes(optionId)
//           ? prev.filter((id) => id !== optionId)
//           : [...prev, optionId]
//       );
//     } else {
//       setSelectedOptionIds([optionId]);
//     }
//   };

//   // GET /room/{roomCode}/test/result로 상태 폴링해서 이동
//   useEffect(() => {
//     if (!hasSubmitted) return;
//     if (!roomCode || !questionId) return;

//     const poll = async () => {
//       try {
//         //
//         const res = await api.getResult({ roomId: roomCode, questionId });

//         const status = res?.status; // "WAITING" | "MATCH" | "MISMATCH"
//         const currentVotes = res?.currentVotes;

//         // 투표 현황 문구 갱신(제출한 사람만 보기)
//         if (typeof currentVotes === "number") {
//           setVoteStatus({ current: currentVotes, total: 4 });
//         }

//         if (status === "MATCH") {
//           navigate("/test/match", { state: payload, replace: true });
//           return;
//         }

//         if (status === "MISMATCH") {
//           navigate("/test/mismatch", { state: payload, replace: true });
//           return;
//         }

//         // WAITING이면 대기
//       } catch (e) {
        
//       }
//     };

//     // 제출 직후 바로 한 번 조회하고, 이후 2초 폴링
//     poll();
//     const t = setInterval(poll, 2000);

//     return () => clearInterval(t);
//   }, [hasSubmitted, roomCode, questionId, navigate, payload]);

//   const handleSubmit = async () => {
//     if (hasSubmitted) return;
//     if (selectedOptionIds.length === 0) return;
//     if (!roomCode || !userId) return;

//     setIsSubmitting(true);

//     try {
//       // POST /room/test/result
//       const res = await api.submitAnswer({
//         roomId: roomCode,
//         roomUserId: userId,
//         questionId,
//         selectedOptionIds,
//       });

//       // 제출 성공 → 잠금
//       setHasSubmitted(true);

//       // POST 응답에서도 WAITING/MATCH/MISMATCH가 오니까 즉시 처리
//       const status = res?.status; 
//       const currentVotes = res?.currentVotes;

//       if (typeof currentVotes === "number") {
//         setVoteStatus({ current: currentVotes, total: 4 });
//       }

//       if (status === "MATCH") {
//         navigate("/test/match", { state: payload, replace: true });
//         return;
//       }

//       if (status === "MISMATCH") {
//         navigate("/test/mismatch", { state: payload, replace: true });
//         return;
//       }

//       // WAITING이면 폴링 useEffect가 계속 진행
//     } catch (e) {
//       console.error("답변 제출 실패:", e);
//       alert("서버 연결에 실패했어요. 잠시 후 다시 시도해 주세요.");
//       setIsSubmitting(false);
//       setHasSubmitted(false);
//       return;
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const buttonText = hasSubmitted ? "투표 완료!" : "선택 완료";

//   return (
//     <Wrapper>
//       <ProgressBar total={totalQuestions} current={currentIndex + 1} />

//       <QuestionCard
//         category={currentQuestion.category}
//         question={currentQuestion.question}
//         options={currentQuestion.options}
//         selectedOption={selectedOptionIds}
//         onSelect={handleSelect}
//         isMultiSelect={isMultiSelect}
//       />

//       {/* 내가 제출한 경우에만 보여주는 문구 */}
//       {hasSubmitted && (
//         <VoteText>
//           {voteStatus ? (
//             <>
//               현재 {voteStatus.current}명이 투표했어요!
//               <br />
//               모두 투표하면 자동으로 넘어가요.
//             </>
//           ) : (
//             <>
//               투표를 제출했어요!
//               <br />
//               다른 사람들의 투표를 기다리는 중이에요.
//             </>
//           )}
//         </VoteText>
//       )}

//       <ButtonWrap>
//         <Button
//           onClick={handleSubmit}
//           disabled={
//             selectedOptionIds.length === 0 || isSubmitting || hasSubmitted
//           }
//         >
//           {buttonText}
//         </Button>
//       </ButtonWrap>
//     </Wrapper>
//   );
// }

// export default TestPage;

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

// const VoteText = styled.div`
//   margin-top: 16px;
//   font-size: 14px;
//   font-weight: 600;
//   color: ${Colors.mainPurple};
//   text-align: center;
// `;


import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import { QUESTION_DATA } from "../../constants/questions";
import ProgressBar from "../../components/common/ProgressBar";
import Button from "../../components/common/Button";
import QuestionCard from "../../components/QuestionCard";
import { api } from "../../utils/api";
import { useRoom } from "../../context/RoomContext";

function TestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode, userId } = useRoom();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteStatus, setVoteStatus] = useState(null);

  // startIndex 받아서 현재 질문 점프
  useEffect(() => {
    const startIndex = location.state?.startIndex;
    if (typeof startIndex === "number") {
      setCurrentIndex(startIndex);
      navigate("/test", { replace: true });
    }
  }, [location.state, navigate]);

  const totalQuestions = QUESTION_DATA.length;

  // currentQuestion이 없어도 hooks가 깨지지 않게 안전하게 처리
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
    }),
    [questionId, nextIndex, totalQuestions, currentIndex]
  );

  // 질문 바뀌면 상태 초기화
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

  const handleNextScreen = (res) => {
    if (!res) return;

    if (res.status === "WAITING") {
      setVoteStatus({
        current: res.currentVotes,
        total: 4,
      });
      return;
    }

    if (res.status === "MATCH") {
      navigate("/match", { state: payload, replace: true });
      return;
    }

    if (res.status === "MISMATCH") {
      navigate("/mismatch", { state: payload, replace: true });
      return;
    }
  };

  // 제출 후: 상태 폴링해서 MATCH/MISMATCH 되면 이동
  useEffect(() => {
    if (!hasSubmitted) return;
    if (!roomCode || !userId) return;
    if (!questionId) return;

    const t = setInterval(async () => {
      try {
        const res = await api.pollTestResult({ roomCode, userId });
        // poll 응답도 { currentVotes, status, data, amIHost } 형태라고 했지?
        handleNextScreen(res);
      } catch (e) {}
    }, 1000);

    return () => clearInterval(t);
  }, [hasSubmitted, roomCode, userId, questionId]);

  const handleSubmit = async () => {
    if (hasSubmitted) return;
    if (!questionId) return;
    if (selectedOptionIds.length === 0) return;

    setIsSubmitting(true);

    try {
      // 선택지 text로 바꿔서 opinion 만들기 (백엔드 명세에 맞춤)
      const selectedTexts = currentQuestion.options
        .filter((opt) => selectedOptionIds.includes(opt.id))
        .map((opt) => opt.text);

      const opinion = selectedTexts; // 기본은 배열

      const res = await api.submitTestResult({
        roomCode,
        questionId,
        roomUserId: userId,
        opinion,
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

  // 여기서부터는 렌더
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

      {hasSubmitted && (
        <VoteText>
          {voteStatus ? (
            <>
              현재 {voteStatus.current}명이 투표했어요!
              <br />
              모두 투표하면 자동으로 넘어가요.
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
          disabled={
            selectedOptionIds.length === 0 || isSubmitting || hasSubmitted
          }
        >
          {hasSubmitted ? "투표 완료!" : "선택 완료"}
        </Button>
      </ButtonWrap>
    </Wrapper>
  );
}

export default TestPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${Colors.backgroundColor};
`;

const ButtonWrap = styled.div`
  width: 746px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const VoteText = styled.div`
  margin-top: 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${Colors.mainPurple};
  text-align: center;
`;

const EmptyText = styled.div`
  margin-top: 80px;
  color: ${Colors.fixGray};
  font-size: 14px;
`;
