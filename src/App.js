
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage/TestPage";
import MatchPage from "./pages/MatchPage/MatchPage";
import MismatchPage from "./pages/MismatchPage/MismatchPage";
import AfterMismatchPage from "./pages/AfterMismatchPage/AfterMismatchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/mismatch" element={<MismatchPage />} />
        <Route path="/after-mismatch" element={<AfterMismatchPage />} />
        <Route path="/after-mismatch" element={<AfterMismatchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
