import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// Interfaces
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
}

const ResponseMessage = ({ socket }: Props) => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (socket) {
      socket.on("f-full_message", (fullMessage: string) =>
        setMessage(fullMessage)
      );
    }
  }, [socket]);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="body1" sx={{ mr: 2 }}>
        Mensaje recibido:
      </Typography>
      <TextField disabled fullWidth id="outlined-disabled" value={message} />
    </Box>
  );
};

export { ResponseMessage };
