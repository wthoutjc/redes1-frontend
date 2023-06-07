import { useContext, useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";

// Socket Context
import { SocketContext } from "../../context";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

// Components
import {
  FrameSequence,
  MainSkeleton,
  Receiver,
  Response,
  ResponseMessage,
  Transmitter,
} from "../../components";
const Main = () => {
  const dispatch = useAppDispatch();
  const { socket, setConnected } = useContext(SocketContext);

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

  if (!socket) return <MainSkeleton />;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: 2,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="body1" fontWeight={600}>
          Protocolo de Transmisión de Datos
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Transmitter socket={socket} />
          <Divider sx={{ mt: 2 }} flexItem variant="middle" />
          <Receiver socket={socket} />
          <Divider sx={{ mt: 2 }} flexItem variant="middle" />
          <Response socket={socket} />
          <ResponseMessage socket={socket} />
        </Box>
        <Box
          sx={{
            width: "25%",
          }}
        >
          <FrameSequence socket={socket} />
        </Box>
      </Box>
    </Box>
  );
};

export { Main };
