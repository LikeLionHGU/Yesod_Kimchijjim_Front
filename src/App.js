// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { RoomProvider } from "./context/RoomContext";

// 공용/메인
import LandingPage from "./pages/LandingPage/LandingPage";
import BoardPage from "./pages/BoardPage/BoardPage";

// 팀원(방 만들기 ~ 테스트 전)
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import LoginTestPage from "./pages/LoadingPage/TestPage";
import RoomStartPage from "./pages/RoomStartPage/RoomStartPage";
import RoomCreatePage from "./pages/RoomCreatePage/RoomCreatePage";
import RoomInvitePage from "./pages/RoomInvitePage/RoomInvitePage";
import RoomJoinPage from "./pages/RoomJoinPage/RoomJoinPage";
import AlreadyRoomStartPage from "./pages/RoomInvitePage/AlreadyRoomStartPage";
import RoomLeaderWaitPage from "./pages/RoomWaitPage/RoomLeaderWaitPage";
import RoomMemberWaitPage from "./pages/RoomWaitPage/RoomMemberWaitPage";

// 너(테스트 시작 ~ 결과)
import TestPage from "./pages/TestPage/TestPage";
import MatchPage from "./pages/MatchPage/MatchPage";
import MismatchPage from "./pages/MismatchPage/MismatchPage";
import AfterMismatchPage from "./pages/AfterMismatchPage/AfterMismatchPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import FinalResultPage from "./pages/FinalResultPage/FinalResultPage";

function App() {
  return (
    <RoomProvider>
      <BrowserRouter>
        <Routes>
          {/* 기본 */}
          <Route path="/" element={<LandingPage />} />

          {/* 팀원 플로우: 로그인/방 생성/초대/대기 */}
          <Route path="/login/test" element={<LoginTestPage />} />
          <Route path="/loading" element={<LoadingPage />} />

          <Route path="/room" element={<RoomStartPage />} />
          <Route path="/room/create" element={<RoomCreatePage />} />
          <Route path="/room/invite" element={<RoomInvitePage />} />
          <Route path="/room/join" element={<RoomJoinPage />} />

          <Route path="/room/error" element={<AlreadyRoomStartPage />} />
          <Route path="/room/leader/wait" element={<RoomLeaderWaitPage />} />
          <Route path="/room/member/wait" element={<RoomMemberWaitPage />} />

          {/* 너 플로우: 테스트 ~ 결과 */}
          {/* 너 코드 기준: TestPage는 /test 로 되어있었지만,
              팀원 라우트가 /room/test 쓰고 있어서 "둘 다" 열어줌 */}
          <Route path="/test" element={<TestPage />} />
          <Route path="/room/test" element={<TestPage />} />

          {/* 너 코드 기준 라우트 */}
          <Route path="/test/match" element={<MatchPage />} />
          <Route path="/test/mismatch" element={<MismatchPage />} />
          <Route path="/test/after-mismatch" element={<AfterMismatchPage />} />
          <Route path="/test/result" element={<ResultPage />} />
          <Route path="/test/final" element={<FinalResultPage />} />

          {/* 팀원이 쓰던(짧은) 라우트로 들어와도 너 페이지로 연결되게 "별칭" 제공 */}
          <Route path="/match" element={<Navigate to="/test/match" replace />} />
          <Route
            path="/mismatch"
            element={<Navigate to="/test/mismatch" replace />}
          />
          <Route
            path="/after-mismatch"
            element={<Navigate to="/test/after-mismatch" replace />}
          />
          <Route
            path="/result"
            element={<Navigate to="/test/result" replace />}
          />
          <Route
            path="/final-result"
            element={<Navigate to="/test/final" replace />}
          />

          {/* 보드 */}
          <Route path="/board" element={<BoardPage />} />

          {/* 그 외는 홈으로 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </RoomProvider>
  );
}

export default App;
