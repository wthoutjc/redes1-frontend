import { useEffect, useState } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

// IScoket
import { Socket } from "socket.io-client";

// Interfaces
import { ISequence } from "../../interfaces";
import { Sequence } from ".";

interface Props {
  socket: Socket;
}

const FrameSequence = ({ socket }: Props) => {
  const [sequence, setSequence] = useState<ISequence[]>([]);

  useEffect(() => {
    socket.on("f-frame_sequence", (data) => setSequence(data));
  }, [socket]);

  return (
    <Paper
      elevation={10}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "secondary.main",
        p: 2,
      }}
    >
      <Box
        id="header"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
          Secuencia de tramas:
        </Typography>
        {sequence.length > 0 ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.default",
              overflowX: "auto",
              borderRadius: 1,
              p: 1,
            }}
          >
            {sequence.map((frame, index) => (
              <Sequence key={index} {...frame} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              backgroundColor: "background.default",
              p: 2,
              borderRadius: 1,
            }}
          >
            <CircularProgress size={25} />
            <Typography variant="body1" fontWeight={400} sx={{ ml: 1 }}>
              Esperando secuencia de tramas...
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export { FrameSequence };
