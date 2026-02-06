
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage/TestPage";
import MatchPage from "./pages/MatchPage/MatchPage";
import MismatchPage from "./pages/MismatchPage/MismatchPage";
import AfterMismatchPage from "./pages/AfterMismatchPage/AfterMismatchPage";
import RoomStartPage from "./pages/RoomStartPage/RoomStartPage"
import RoomCreatePage from "./pages/RoomCreatePage/RoomCreatePage";
import RoomInvitePage from "./pages/RoomInvitePage/RoomInvitePage";
import RoomJoinPage from "./pages/RoomJoinPage/RoomJoinPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<RoomStartPage />} />
        <Route path="/room/create" element={<RoomCreatePage/>}/>
        <Route path="/room/invite" element={<RoomInvitePage/>}/>
        <Route path="/room/join" element={<RoomJoinPage/>}/>
        <Route path="/match" element={<MatchPage />} />
        <Route path="/mismatch" element={<MismatchPage />} />
        <Route path="/after-mismatch" element={<AfterMismatchPage />} />
        <Route path="/after-mismatch" element={<AfterMismatchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
