// Interfaces
import { Paper, Typography } from "@mui/material";
import { ISequence } from "../../interfaces";

const Sequence = ({ error, message }: ISequence) => {
  return (
    <Paper
      sx={{ p: 1, overflow: "none", mb: 1 }}
      elevation={2}
      className="animate__animated animate__bounceInRight"
    >
      {error ? (
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{ mb: 1 }}
          color="error"
        >
          {error}
        </Typography>
      ) : (
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{ mb: 1 }}
        >
          {message}
        </Typography>
      )}
    </Paper>
  );
};

export { Sequence };
