import LeaderResultPage from "./LeaderResultPage";
import MemberResultPage from "./MemberResultPage";
import { useRoom } from "../../context/RoomContext";

function ResultPage() {
  const { amIHost } = useRoom();
  return amIHost ? <LeaderResultPage /> : <MemberResultPage />;
}

export default ResultPage;
