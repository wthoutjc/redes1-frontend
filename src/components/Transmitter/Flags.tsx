import { useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

// IScoket
import { Socket } from "socket.io-client";

// React Hook Form
import { useForm } from "react-hook-form";

// Interfaces
import { ITrama, IPlot } from "../../interfaces";

// Icons
import SendIcon from "@mui/icons-material/Send";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

interface Props {
  socket: Socket;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  plots: IPlot[];
  currentPlot: number;
  frames: number;
}

const Flags = ({
  socket,
  loading,
  setLoading,
  plots,
  currentPlot,
  frames,
}: Props) => {
  const dispatch = useAppDispatch();

  const { watch, setValue, handleSubmit, register } = useForm<ITrama>({
    defaultValues: {
      indicator: 0b00000000,
      startMessage: true,
      endMessage: false,
      requestConfirmation: false,
      sendConfirmation: false,
      sequence: currentPlot,
    },
  });

  const startMessage = watch("startMessage");
  const endMessage = watch("endMessage");
  const requestConfirmation = watch("requestConfirmation");

  const handleSend = (data: ITrama) => {
    if (plots.length === 0) {
      const notification = {
        id: uuid(),
        title: "Error",
        message: "No se ha ingresado un mensaje",
        type: "error" as "error" | "success" | "info" | "warning",
        autoDismiss: 5000,
      };
      dispatch(newNotification(notification));
      return;
    }

    if (!frames) {
      const notification = {
        id: uuid(),
        title: "Error",
        message: "No se ha ingresado un número de frames",
        type: "error" as "error" | "success" | "info" | "warning",
        autoDismiss: 5000,
      };
      dispatch(newNotification(notification));
      return;
    }

    // if (currentPlot >= frames) {
    //   const notification = {
    //     id: uuid(),
    //     title: "Error",
    //     message: "Trama completada",
    //     type: "error" as "error" | "success" | "info" | "warning",
    //     autoDismiss: 5000,
    //   };
    //   dispatch(newNotification(notification));
    //   return;
    // }

    setLoading(true);
    socket.emit("message", JSON.stringify({ ...data, frames }));
    setLoading(false);
  };

  useEffect(() => {
    if (plots[currentPlot]) {
      setValue("indicator", plots[currentPlot].id);
      setValue("message", plots[currentPlot].plot);
    }
  }, [plots, currentPlot, setValue]);

  useEffect(() => {
    setValue("sequence", currentPlot);
  }, [currentPlot, setValue]);

  useEffect(() => {
    if (startMessage) setValue("endMessage", !startMessage);
  }, [startMessage, endMessage, setValue]);

  useEffect(() => {
    if (requestConfirmation) {
      setValue("message", "Control, permiso para transmtir");
      setValue("sequence", -1);
    } else {
      setValue("message", plots[currentPlot]?.plot);
      setValue("sequence", currentPlot);
    }
  }, [requestConfirmation, setValue, currentPlot, plots]);

  if (loading) return <Box>Cargando...</Box>;

  return (
    <form
      onSubmit={handleSubmit(handleSend)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: 10,
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
              value={plots[currentPlot]?.id || "No indicator"}
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
              control={<Checkbox checked={watch("startMessage")} />}
              label="SM" // SM = Start Message
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 1,
              }}
              {...register("startMessage")}
            />
            <FormControlLabel
              control={<Checkbox checked={watch("endMessage")} />}
              label="EM" // EM = End Message
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 1,
              }}
              {...register("endMessage")}
            />
            <FormControlLabel
              control={<Checkbox checked={watch("requestConfirmation")} />}
              label="RC" // RC = Request Confirmation
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 1,
              }}
              {...register("requestConfirmation")}
            />
            <FormControlLabel
              control={<Checkbox checked={watch("sendConfirmation")} />}
              label="SC" // SC = Send Confirmation
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 1,
              }}
              {...register("sendConfirmation")}
            />
          </Box>
          <Box>
            <Typography variant="body2">Semántica: Trama de datos</Typography>
          </Box>
        </Box>
        <FormControlLabel
          control={
            <TextField
              disabled
              id="outlined-disabled"
              value={watch("sequence")}
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
              value={watch("message") || "No message"}
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
              value={plots[currentPlot]?.id || "No indicator"}
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
          Enviar
        </Button>
      </Box>
    </form>
  );
};

export { Flags };
