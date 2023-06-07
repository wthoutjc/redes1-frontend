import { useState, useEffect } from "react";
import { Box, FormControlLabel, TextField, Typography } from "@mui/material";

// ISocket
import { Socket } from "socket.io-client";

// Components
import { RecieverSkeleton } from "../../components";
import { ITrama } from "../../interfaces";

// Utils
import { toBinary } from "../../utils";

interface Props {
  socket: Socket;
}

const Receiver = ({ socket }: Props) => {
  const [currenPlot, setCurrenPlot] = useState<null | ITrama>(null);

  useEffect(() => {
    socket.on("f-message", (plot: ITrama) => {
      console.log(plot);
      setCurrenPlot(plot);
    });
  }, [socket]);

  if (!currenPlot) return <RecieverSkeleton />;

  const {
    indicator,
    sequence,
    message,
    startMessage,
    endMessage,
    requestConfirmation,
    sendConfirmation,
  } = currenPlot;

  return (
    <Box
      id="receiver"
      sx={{
        width: "100%",
        p: 2,
      }}
    >
      <Typography variant="body1" fontWeight={600} sx={{ mb: 2 }}>
        Receptor
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          p: 1,
          pt: 0,
        }}
      >
        <FormControlLabel
          control={
            <TextField
              disabled
              id="outlined-disabled"
              value={toBinary(indicator)}
            />
          }
          label="Header"
          sx={{
            display: "flex",
            flexDirection: "column",
            mr: 2,
          }}
        />
        <TextField
          disabled
          id="outlined-disabled"
          value={`${startMessage ? "1" : "0"}${endMessage ? "1" : "0"}${
            requestConfirmation ? "1" : "0"
          }${sendConfirmation ? "1" : "0"}${sequence}`}
        />
        <FormControlLabel
          control={
            <TextField disabled id="outlined-disabled" value={message} />
          }
          label="Información"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        />
        <FormControlLabel
          control={
            <TextField
              disabled
              id="outlined-disabled"
              value={toBinary(indicator)}
            />
          }
          label="Trailer"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        />
      </Box>
    </Box>
  );
};

export { Receiver };
