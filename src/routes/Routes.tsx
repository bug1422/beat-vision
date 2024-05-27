import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import { allAdminRoutes, allBlankRoutes, allCustomerRoutes, allProducerRoutes } from "./index";
import Layout from "@/layout/Layout";
import { useAuthContext } from "@/context";
import DefaultLayout from "@/layout/DefaultLayout";
import { ProducerLayout } from "@/layout/MyCustomLayout/ProducerLayout";

const AllRoutes = (props: RouteProps) => {
  const { isAuthenticated } = useAuthContext();
  return (
    <Routes>
      <Route>
        {allBlankRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={<DefaultLayout {...props}>{route.element}</DefaultLayout>}
          />
        ))}
      </Route>

      <Route>
        {allAdminRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              isAuthenticated === false ? (
                <Navigate
                  to={{
                    pathname: "/auth/login",
                    search: "next=" + route.path,
                  }}
                />
              ) : (
                <Layout {...props}>{route.element}</Layout>
              )
            }
            key={idx}
          />
        ))}
      </Route>

      <Route>
        {allCustomerRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={<DefaultLayout {...props}>{route.element}</DefaultLayout>}
          />
        ))}
      </Route>
      <Route>
        {allProducerRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<ProducerLayout {...props}>{route.element}</ProducerLayout>}
            />
        ))}
      </Route>
    </Routes>
  );
};

export default AllRoutes;
