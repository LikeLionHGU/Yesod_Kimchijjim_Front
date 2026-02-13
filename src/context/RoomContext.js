import { createContext, useContext, useEffect, useState } from "react";

const RoomContext = createContext(null);

// sessionStorage 키를 프로젝트 전체에서 통일
const KEY_ROOM_CODE = "currentRoomCode";
const KEY_USER_ID = "userId";
const KEY_AM_I_HOST = "amIHost";

export function RoomProvider({ children }) {
  const [roomCode, setRoomCodeState] = useState("");
  const [userId, setUserIdState] = useState(null);
  const [amIHost, setAmIHostState] = useState(false);

  // 최초 1회: sessionStorage에서 불러오기
  useEffect(() => {
    const savedRoomCode = sessionStorage.getItem(KEY_ROOM_CODE) || "";
    const savedUserId = sessionStorage.getItem(KEY_USER_ID) || "";
    const savedAmIHost = sessionStorage.getItem(KEY_AM_I_HOST) || "false";

    setRoomCodeState(savedRoomCode);
    setUserIdState(savedUserId ? Number(savedUserId) : null);
    setAmIHostState(savedAmIHost === "true");
  }, []);

  //setter를 “저장까지 같이” 하도록 래핑
  const setRoomCode = (next) => {
    const v = next || "";
    setRoomCodeState(v);
    sessionStorage.setItem(KEY_ROOM_CODE, v);
  };

  const setUserId = (next) => {
    const v = next === null || next === undefined ? "" : String(next);
    setUserIdState(v ? Number(v) : null);
    if (v) sessionStorage.setItem(KEY_USER_ID, v);
  };

  const setAmIHost = (next) => {
    const v = Boolean(next);
    setAmIHostState(v);
    sessionStorage.setItem(KEY_AM_I_HOST, String(v));
  };

  return (
    <RoomContext.Provider
      value={{
        roomCode,
        setRoomCode,
        userId,
        setUserId,
        amIHost,
        setAmIHost,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  return useContext(RoomContext);
}
