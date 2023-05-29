import { Box, CircularProgress, Typography } from "@mui/material";

const RecieverSkeleton = () => {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography variant="body1" fontWeight={600} sx={{ mb: 2 }}>
        Receptor
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <CircularProgress size={25} />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Esperando trama...
        </Typography>
      </Box>
    </Box>
  );
};

export { RecieverSkeleton };
