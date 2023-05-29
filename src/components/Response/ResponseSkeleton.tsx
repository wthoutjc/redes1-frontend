import { Box, CircularProgress, Typography } from "@mui/material";

const ResponseSkeleton = () => {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography variant="body1" fontWeight={600} sx={{ mb: 2 }}>
        Respuesta
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <CircularProgress size={25} />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Esperando respuesta...
        </Typography>
      </Box>
    </Box>
  );
};

export { ResponseSkeleton };
