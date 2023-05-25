// Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Routes
import { publicRoutes } from "../routes";

const MainRoute = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Outlet />}>
          {publicRoutes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export { MainRoute };
