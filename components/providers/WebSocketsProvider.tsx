"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { GlobalAuthContext } from "./GlobalAuthProviderContext";

export default function WebSocketsProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState(null);
  const authUser = useContext(GlobalAuthContext);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_BASE_URL);
    setSocket(socket);
    socket.emit("join_companies_rooms", authUser.user["id"]);

    socket.on("add_quiz", (message) => {
      toast(
        `There is a new quiz: ${message.quizName}. In ${message.companyName}.`,
        { autoClose: 2000, type: "success" }
      );
    });
    return () => {
      socket.disconnect();
    };
  }, [authUser]);

  return (
    <GlobalSocketContext.Provider value={{ socket }}>
      {children}
    </GlobalSocketContext.Provider>
  );
}

export const GlobalSocketContext = createContext({ socket: null });
