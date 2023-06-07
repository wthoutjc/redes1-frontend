import { useEffect, useState } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import NumbersIcon from "@mui/icons-material/Numbers";

// Interfaces
import { IPlot, ITransmitter } from "../../interfaces";

// React Hook Form
import { useForm } from "react-hook-form";

// IScoket
import { Socket } from "socket.io-client";

// Components
import { Flags } from "../../components";

// Utils
import { toBinary } from "../../utils";

interface Props {
  socket: Socket;
}

let INICIO = 0b1000001;

const Transmitter = ({ socket }: Props) => {
  const [loading, setLoading] = useState(false);
  const [plots, setPlots] = useState<IPlot[]>([]);
  const [currentPlot, setCurrentPlot] = useState(0);
  const [disableFrames, setDisableFrames] = useState(false)

  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ITransmitter>({
    defaultValues: {
      message: "",
      frames: 0,
    },
  });

  const message = watch("message");
  const frames = watch("frames");

  useEffect(() => {
    const newPlots: IPlot[] = [];
    const frameLength = Math.ceil(message.length / frames);

    // Divide el mensaje en frames y los guarda en el array
    for (let i = 0; i < message.length; i += frameLength) {
      const plot = message.slice(i, i + frameLength);
      newPlots.push({
        id: toBinary(INICIO + i),
        plot,
      });
      INICIO += 1;
    }

    setPlots(newPlots);
  }, [message, frames]);

  useEffect(() => {
    socket.on("f-current_plot", (data) => setCurrentPlot(data));
    socket.on("f-reset", () => {
      setPlots([]);
      setCurrentPlot(0);
      setDisableFrames(false);
      setValue("frames", 0);
      setValue("message", "");
    })
  }, [socket, setValue]);

  return (
    <Box
      id="transmitter"
      sx={{
        width: "100%",
        p: 2,
      }}
    >
      <Typography variant="body1" fontWeight={600} sx={{ mb: 2 }}>
        Transmisor
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
        }}
      >
        <TextField
          disabled={loading}
          fullWidth
          type="text"
          placeholder="Ej: HOLA COMO ESTAS?"
          autoComplete="off"
          label="Mensaje"
          sx={{ mr: 2 }}
          error={!!errors.message}
          helperText={
            watch("message").length > 0
              ? `Tamaño del mensaje ${watch("message").length}`
              : errors.message
              ? errors.message.message
              : "Escribe el mensaje..."
          }
          {...register("message", {
            required: "El mensaje es requerido",
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          disabled={loading || disableFrames}
          fullWidth
          type="number"
          placeholder="2"
          autoComplete="redes1-frames"
          label="Frames"
          sx={{ width: "13%" }}
          error={!!errors.frames}
          helperText={
            errors.frames ? errors.frames.message : "Número de frames..."
          }
          {...register("frames", {
            required: "Campo requerido",
            validate: (value) =>
              watch("message").length % value === 0 || "Campo inválido",
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <NumbersIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Flags
          socket={socket}
          loading={loading}
          setLoading={setLoading}
          plots={plots}
          currentPlot={currentPlot}
          frames={frames}
          setDisableFrames={setDisableFrames}
        />
      </Box>
    </Box>
  );
};

export { Transmitter };
