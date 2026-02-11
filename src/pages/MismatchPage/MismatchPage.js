import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeaderMismatchPage from "./LeaderMismatchPage";
import MemberMismatchPage from "./MemberMismatchPage";
import { useRoom } from "../../context/RoomContext";

function MismatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { amIHost } = useRoom();

  useEffect(() => {
    if (!state?.questionId) {
      navigate("/test", { replace: true });
    }
  }, [state, navigate]);

  return amIHost ? <LeaderMismatchPage /> : <MemberMismatchPage />;
}

export default MismatchPage;
