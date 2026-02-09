
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage/TestPage";
import MatchPage from "./pages/MatchPage/MatchPage";
import MismatchPage from "./pages/MismatchPage/MismatchPage";
import AfterMismatchPage from "./pages/AfterMismatchPage/AfterMismatchPage";
import Resultpage from "./pages/ResultPage/ResultPage"
import RoomStartPage from "./pages/RoomStartPage/RoomStartPage"
import RoomCreatePage from "./pages/RoomCreatePage/RoomCreatePage";
import RoomJoinPage from "./pages/RoomJoinPage/RoomJoinPage";
import FinalResultPage from "./pages/FinalResultPage/FinalResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
{/* 
        <Route path="/" element={<RoomStartPage />} />
        <Route path="/room/create" element={<RoomCreatePage/>}/>
        <Route path="/room/join" element={<RoomJoinPage/>}/> */}
        <Route path="/" element={<TestPage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/mismatch" element={<MismatchPage />} />
        <Route path="/after-mismatch" element={<AfterMismatchPage />} />
        <Route path="/result" element={<Resultpage />} />
        <Route path="/final-result" element={<FinalResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
