import { Box, Paper, Typography } from "@mui/material";

const FrameSequence = () => {
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            p: 2,
            backgroundColor: "background.default",
            overflowX: "auto",
            borderRadius: 1,
          }}
        >
          xd
        </Box>
      </Box>
    </Paper>
  );
};

export { FrameSequence };
