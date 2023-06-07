import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

// React Hook Form
import { useForm } from "react-hook-form";

// Interfaces
import { ITrama } from "../../interfaces";
import { Socket } from "socket.io-client";

// Icons
import SendIcon from "@mui/icons-material/Send";

// Utils
import { toBinary } from "../../utils";
import { useEffect, useState } from "react";
import { ResponseSkeleton } from ".";

interface Props {
  socket: Socket;
}

const Response = ({ socket }: Props) => {
  const [response, setResponse] = useState<null | ITrama>(null);

  const { watch, handleSubmit, setValue } = useForm<ITrama>();

  const handleResponse = () => {
    if (socket && response) socket.emit("b-response", response.message);
  };

  useEffect(() => {
    if (socket) {
      socket.on("f-response", (response: ITrama) => {
        setValue("indicator", response.indicator);
        setValue("startMessage", response.startMessage);
        setValue("endMessage", response.endMessage);
        setValue("requestConfirmation", response.requestConfirmation);
        setValue("sendConfirmation", response.sendConfirmation);
        setValue("sequence", response.sequence);
        setValue("message", response.message);
        setResponse(response);
      });
    }
  }, [socket, setValue]);

  if (!response) return <ResponseSkeleton />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          pb: 0,
        }}
      >
        <Typography variant="body1" fontWeight={600}>
          Respuesta
        </Typography>
      </Box>
      <form
        onSubmit={handleSubmit(handleResponse)}
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: 25,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <FormControlLabel
            control={
              <TextField
                disabled
                id="outlined-disabled"
                value={toBinary(watch("indicator"))}
              />
            }
            label="Indicador"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mr: 1,
              ml: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                mb: 1,
              }}
            >
              <FormControlLabel
                control={<Checkbox disabled checked={watch("startMessage")} />}
                label="SM" // SM = Start Message
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  ml: 1,
                }}
              />
              <FormControlLabel
                control={<Checkbox disabled checked={watch("endMessage")} />}
                label="EM" // EM = End Message
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  ml: 1,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox disabled checked={watch("requestConfirmation")} />
                }
                label="RC" // RC = Request Confirmation
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  ml: 1,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox disabled checked={watch("sendConfirmation")} />
                }
                label="SC" // SC = Send Confirmation
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  ml: 1,
                }}
              />
            </Box>
            <Box>
              <Typography variant="body2">
                Semántica: Trama de control, Trama recibida con éxito
              </Typography>
            </Box>
          </Box>
          <FormControlLabel
            control={
              <TextField
                disabled
                id="outlined-disabled"
                value={toBinary(watch("sequence"))}
                sx={{ width: 50, ml: 2 }}
              />
            }
            label="NUM"
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
                value={watch("message")}
              />
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
                value={toBinary(watch("indicator"))}
              />
            }
            label="Indicador"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          />
        </Box>
        <Box>
          <Button
            type="submit"
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
          >
            Responder
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export { Response };
