import { useContext, useEffect } from "react";
import { Box } from "@mui/material";

// Socket Context
import { SocketContext } from "../../context";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

const Main = () => {
  const dispatch = useAppDispatch();
  const { socket, connected, setConnected } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      if (!socket.connected) setConnected(false);
      socket.on("connect", () => setConnected(true));
      const notification = {
        id: uuid(),
        title: "Éxito",
        message: "Socket conectado",
        type: "success" as "error" | "success" | "info" | "warning",
        autoDismiss: 5000,
      };
      dispatch(newNotification(notification));
    }
  }, [socket, setConnected, dispatch]);
  return <Box>{connected ? "Conectado" : "Desconectado"}</Box>;
};

export { Main };
