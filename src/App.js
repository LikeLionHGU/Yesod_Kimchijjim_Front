
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { RoomProvider } from "./context/RoomContext";

// 공용/메인
import LandingPage from "./pages/LandingPage/LandingPage";
import BoardPage from "./pages/BoardPage/BoardPage";

// (방 만들기 ~ 테스트 전)
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import LoginTestPage from "./pages/LoadingPage/TestPage";
import RoomStartPage from "./pages/RoomStartPage/RoomStartPage";
import RoomCreatePage from "./pages/RoomCreatePage/RoomCreatePage";
import RoomInvitePage from "./pages/RoomInvitePage/RoomInvitePage";
import RoomJoinPage from "./pages/RoomJoinPage/RoomJoinPage";
import AlreadyRoomStartPage from "./pages/RoomInvitePage/AlreadyRoomStartPage";
import RoomLeaderWaitPage from "./pages/RoomWaitPage/RoomLeaderWaitPage";
import RoomMemberWaitPage from "./pages/RoomWaitPage/RoomMemberWaitPage";

//(테스트 시작 ~ 결과)
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
          
          <Route path="/" element={<LandingPage />} />

          
          <Route path="/login/test" element={<LoginTestPage />} />
          <Route path="/loading" element={<LoadingPage />} />

          <Route path="/room" element={<RoomStartPage />} />
          <Route path="/room/create" element={<RoomCreatePage />} />
          <Route path="/room/invite" element={<RoomInvitePage />} />
          <Route path="/room/join" element={<RoomJoinPage />} />

          <Route path="/room/error" element={<AlreadyRoomStartPage />} />
          <Route path="/room/leader/wait" element={<RoomLeaderWaitPage />} />
          <Route path="/room/member/wait" element={<RoomMemberWaitPage />} />

          
          <Route path="/test" element={<TestPage />} />
          <Route path="/room/test" element={<TestPage />} />

          
          <Route path="/test/match" element={<MatchPage />} />
          <Route path="/test/mismatch" element={<MismatchPage />} />
          <Route path="/test/after-mismatch" element={<AfterMismatchPage />} />
          <Route path="/test/result" element={<ResultPage />} />
          <Route path="/test/final" element={<FinalResultPage />} />

          
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

          
          <Route path="/board" element={<BoardPage />} />

          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </RoomProvider>
  );
}

export default App;
