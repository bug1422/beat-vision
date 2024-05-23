import { lazy } from "react";
import { Navigate, RouteProps } from "react-router";
//Authentication
const Login = lazy(() => import("@/pages/authentication/Login"));
const Register = lazy(() => import("@/pages/authentication/Register"));
const RecoverPW = lazy(() => import("@/pages/authentication/RecoverPW"));
const Error404 = lazy(() => import("@/pages/authentication/Error404"));
const Error500 = lazy(() => import("@/pages/authentication/Error500"));

// Pages
const HomePage = lazy(()=> import("@/pages/pages/Home"))

//Applicatoin create page
const MusicDetail = lazy(() => import("@/pages/music-detail"));
export type RoutesProps = {
  path: RouteProps["path"];
  name: string;
  element: RouteProps["element"];
};

const dashboardRoutes: RoutesProps[] = [
  //   {
  //     path: "/",
  //     name: "Home Page",
  //     element: <Navigate to="/dashboards/analytics" />,
  //   },
];

const appsRoutes: RoutesProps[] = [
  {
    path: "/",
    name: "Home Page",
    element: <HomePage/>,
  },
  {
    path: "/music-detail/detail",
    name: "Music Detail Page",
    element: <MusicDetail />,
  },
];

const authRoutes: RoutesProps[] = [
  {
    path: "/auth/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    name: "Register",
    element: <Register />,
  },
  {
    path: "/auth/recover-pw",
    name: "Recover Password",
    element: <RecoverPW />,
  },
  {
    path: "/auth/auth-404",
    name: "404 Error",
    element: <Error404 />,
  },
  {
    path: "/auth/auth-500",
    name: "500 Error",
    element: <Error500 />,
  },
];

const allCustomerRoutes = [...appsRoutes];

const allAdminRoutes = [...dashboardRoutes];

const allBlankRoutes = [...authRoutes];

export { allAdminRoutes, allBlankRoutes, allCustomerRoutes };
