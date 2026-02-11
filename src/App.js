import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RoomProvider } from "./context/RoomContext";

import LandingPage from "./pages/LandingPage/LandingPage";
import BoardPage from "./pages/BoardPage/BoardPage";

import TestPage from "./pages/TestPage/TestPage";
import MatchPage from "./pages/MatchPage/MatchPage";
import MismatchPage from "./pages/MismatchPage/MismatchPage";
import AfterMismatchPage from "./pages/AfterMismatchPage/AfterMismatchPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import FinalResultPage from "./pages/FinalResultPage/FinalResultPage";
import RoomMemberWaitPage from "./pages/RoomWaitPage/RoomMemberWaitPage";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import AlreadyRoomStartPage from "./pages/RoomInvitePage/AlreadyRoomStartPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginTestPage from "./pages/LoadingPage/TestPage";

function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/board" element={<BoardPage />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/login/test" element={<LoginTestPage/>}/>
        <Route path="/room" element={<RoomStartPage/>}/>
        <Route path="/loading" element={<LoadingPage/>}/>
        <Route path="/room/create" element={<RoomCreatePage/>}/>
        <Route path="/room/invite" element={<RoomInvitePage/>}/>
        <Route path="/room/error" element={<AlreadyRoomStartPage/>}/>
        <Route path="/room/leader/wait" element={<RoomLeaderWaitPage/>}/>
        <Route path="/room/join" element={<RoomJoinPage/>}/>
        <Route path="/room/member/wait" element={<RoomMemberWaitPage/>}/>
        <Route path="/room/test" element={<TestPage/>}/>
        <Route path="/match" element={<MatchPage />} />
        <Route path="/mismatch" element={<MismatchPage />} />
        <Route path="/after-mismatch" element={<AfterMismatchPage />} />
        <Route path="/result" element={<Resultpage />} />
        {/* <Route path="/final-result" element={<FinalResultPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
