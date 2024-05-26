import ProducerPage from "@/pages/producer-page";
import ProducerPublish from "@/pages/producer-page/producer-publish";
import ProducerSale from "@/pages/producer-page/producer-sales";
import { lazy } from "react";
import { RouteProps } from "react-router";
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

// Producer page
const ProducerMusics = lazy(() => import("@/pages/producer-page/producer-music/index"));
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

const producerRoute: RoutesProps[] = [
  {
    path: "/user/id/producer-page",
    name: "Producer manager page",
    element: <ProducerPage />,
  },
  {
    path: "/user/id/producer-page/my-music",
    name: "producer music management",
    element: <ProducerMusics />,
  },
  {
    path: "/user/id/producer-page/my-publish",
    name: "producer publish management",
    element: <ProducerPublish />,
  },
  {
    path: "/user/id/producer-page/my-sale",
    name: "producer page",
    element: <ProducerSale />,
  },
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

const allProducerRoutes = [...producerRoute];
export { allAdminRoutes, allBlankRoutes, allCustomerRoutes, allProducerRoutes };
