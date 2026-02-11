import { createContext, useContext, useState, useEffect } from "react";



const RoomContext = createContext(null);

export function RoomProvider({ children }) {
  const [roomCode, setRoomCode] = useState(null);
  const [userId, setUserId] = useState(null);
  const [amIHost, setAmIHost] = useState(false);

  
  
  useEffect(() => {
    const savedRoomCode = localStorage.getItem("roomCode");
    const savedUserId = localStorage.getItem("userId");
    const savedAmIHost = localStorage.getItem("amIHost");

    if (savedRoomCode) setRoomCode(savedRoomCode);
    if (savedUserId) setUserId(Number(savedUserId));
    if (savedAmIHost) setAmIHost(savedAmIHost === "true");
  }, []);

  

  
  useEffect(() => {
    if (roomCode) localStorage.setItem("roomCode", roomCode);
  }, [roomCode]);

  useEffect(() => {
    if (userId) localStorage.setItem("userId", userId);
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("amIHost", amIHost);
  }, [amIHost]);

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


// 각 페이지에서 const { roomCode, userId, amIHost } = useRoom(); 꺼내쓰기

export function useRoom() {
  return useContext(RoomContext);
}
