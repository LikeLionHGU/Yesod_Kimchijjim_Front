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

import RoomCreatePage from "./pages/RoomCreatePage/RoomCreatePage";
import RoomJoinPage from "./pages/RoomJoinPage/RoomJoinPage";
// import RoomWaitPage from "./pages/RoomWaitPage/RoomWaitPage";
import RoomStartPage from "./pages/RoomStartPage/RoomStartPage";

function App() {
  return (
    <RoomProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/board" element={<BoardPage />} />

          <Route path="/room/start" element={<RoomStartPage />} />
          <Route path="/room/create" element={<RoomCreatePage />} />
          <Route path="/room/join" element={<RoomJoinPage />} />
          {/* <Route path="/room/wait" element={<RoomWaitPage />} /> */}

          <Route path="/test" element={<TestPage />} />
          <Route path="/test/match" element={<MatchPage />} />
          <Route path="/test/mismatch" element={<MismatchPage />} />
          <Route path="/test/after-mismatch" element={<AfterMismatchPage />} />
          <Route path="/test/result" element={<ResultPage />} />
          <Route path="/test/final" element={<FinalResultPage />} />
        </Routes>
      </BrowserRouter>
    </RoomProvider>
  );
}

export default App;
