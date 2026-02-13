
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeaderMismatchPage from "./LeaderMismatchPage";
import MemberMismatchPage from "./MemberMismatchPage";

function MismatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.questionId) {
      navigate("/room/test", { replace: true });
    }
  }, [state, navigate]);

  const amIHost = state?.amIHost === true;

  return amIHost ? <LeaderMismatchPage /> : <MemberMismatchPage />;
}

export default MismatchPage;
