// Interfaces
import { IRoute } from "../interfaces";

// Components
import { Layout, Main } from "../components";

const publicRoutes: IRoute[] = [
  {
    path: "/",
    name: "Home",
    element: <Layout children={<Main />} />,
    exact: true,
  },
];

export { publicRoutes };
