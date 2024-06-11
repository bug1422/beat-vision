import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import { allBlankRoutes, allCustomerRoutes, allProducerRoutes } from "./index";
import { useAuthContext } from "@/context";
import DefaultLayout from "@/layout/DefaultLayout";
import { ProducerLayout } from "@/layout/MyCustomLayout/ProducerLayout";

const AllRoutes = (props: RouteProps) => {
  const { user } = useAuthContext();
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
            element={
              user == undefined || user.MyRole?.toLowerCase() !== "admin" ? (
                <Navigate
                  to={{
                    pathname: "/auth/auth-500",
                    search: "next=" + route.path,
                  }}
                />
              ) : (
                <ProducerLayout {...props}>{route.element}</ProducerLayout>
              )
            }
          />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/auth/auth-404" replace />} />
    </Routes>
  );
};

export default AllRoutes;
