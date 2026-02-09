
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage/TestPage";
import MatchPage from "./pages/MatchPage/MatchPage";
import MismatchPage from "./pages/MismatchPage/MismatchPage";
import AfterMismatchPage from "./pages/AfterMismatchPage/AfterMismatchPage";
import Resultpage from "./pages/ResultPage/ResultPage"
import RoomStartPage from "./pages/RoomStartPage/RoomStartPage"
import RoomCreatePage from "./pages/RoomCreatePage/RoomCreatePage";
import RoomInvitePage from "./pages/RoomInvitePage/RoomInvitePage";
import RoomLeaderWaitPage from "./pages/RoomWaitPage/RoomLeaderWaitPage";
import RoomJoinPage from "./pages/RoomJoinPage/RoomJoinPage";
import FinalResultPage from "./pages/FinalResultPage/FinalResultPage";
import RoomMemberWaitPage from "./pages/RoomWaitPage/RoomMemberWaitPage";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import AlreadyRoomStartPage from "./pages/RoomInvitePage/AlreadyRoomStartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<RoomStartPage />} />
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
