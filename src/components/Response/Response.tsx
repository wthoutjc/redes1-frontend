import { useState } from "react";
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
import { IFlag } from "../../interfaces";

// Icons
import SendIcon from "@mui/icons-material/Send";

// Components
import { ResponseSkeleton } from "../../components";

const Response = () => {
  const [response, setResponse] = useState(null);
  const handleResponse = () => undefined;

  const { watch, handleSubmit } = useForm<IFlag>();

  if (!response) return <ResponseSkeleton />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
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
                value={"No indicator"}
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
                value={1}
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
              <TextField disabled id="outlined-disabled" value={"No message"} />
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
                value={"No indicator"}
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
      <Box
        sx={{
          display: "flex",
          p: 3,
          width: "100%",
        }}
      >
        <FormControlLabel
          control={
            <TextField
              fullWidth
              disabled
              id="outlined-disabled"
              value={"No indicator"}
            />
          }
          label="Mensaje recibido"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        />
      </Box>
    </Box>
  );
};

export { Response };
