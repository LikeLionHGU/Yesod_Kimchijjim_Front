import { useEffect, useState } from "react";
import LeaderResultPage from "./LeaderResultPage";
import MemberResultPage from "./MemberResultPage";
import { api } from "../../utils/api";
import { useRoom } from "../../context/RoomContext";

function ResultPage() {
  const room = useRoom();

  const roomCode =
    room?.roomCode || sessionStorage.getItem("currentRoomCode") || "";
  const userIdStr = room?.userId || sessionStorage.getItem("userId") || "";
  const userId = userIdStr ? Number(userIdStr) : null;

  const isRoomHost = room?.amIHost;

  const [amIHost, setAmIHost] = useState(Boolean(isRoomHost));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!roomCode || !userId) return;

    (async () => {
      try {
        const res = await api.getRuleSummary({ roomCode, userId });

        const hostCheck = res?.data?.amIHost ?? res?.amIHost ?? false;
        
        setAmIHost(Boolean(hostCheck) || Boolean(room?.amIHost));
      } catch (e) {
        console.error("[ResultPage] getRuleSummary failed:", e?.message || e);
      } finally {
        setReady(true);
      }
    })();
  }, [roomCode, userId, room?.amIHost]);

  if (!ready) return null;

  return amIHost ? <LeaderResultPage /> : <MemberResultPage />;
}

export default ResultPage;
