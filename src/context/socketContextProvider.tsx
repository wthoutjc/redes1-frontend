import { createContext, useState, useEffect } from "react";
import client, { Socket } from "socket.io-client";

interface Props {
  children: React.ReactNode;
}

const SocketContext = createContext<{
  socket: Socket | null;
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  socket: null,
  connected: false,
  setConnected: () => undefined,
});

export function ContextSocketProvider({ children }: Props) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketClient = client(`${import.meta.env.VITE_SOCKET_URL}`);
    setSocket(socketClient);
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected, setConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContext;
