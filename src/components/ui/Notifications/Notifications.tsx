import { Box } from "@mui/material";

// Components
import { Notification } from "./";

// Redux
import { useAppSelector } from "../../../hooks";

const Notifications = () => {
  const { notifications } = useAppSelector((state) => state.ui);

  return (
    <Box
      sx={{
        position: "absolute",
        right: "10px",
        bottom: 0,
        zIndex: 20000,
        height: "fit-content",
        maxHeight: "100vh",
        width: "300px",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </Box>
  );
};

export { Notifications };
