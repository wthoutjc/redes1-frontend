import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      {children}
    </Box>
  );
};

export { Layout };
