import "./styles/styles.scss";
import "animate.css";

// Context
import { ContextSocketProvider } from "./context/";

// MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./themes";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

// Components
import { Notifications } from "./components";

// Router
import { MainRoute } from "./routes";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Provider store={store}>
        <ContextSocketProvider>
          <Notifications />
          <MainRoute />
        </ContextSocketProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
