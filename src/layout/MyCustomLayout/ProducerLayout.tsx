import { Suspense, type ReactNode, useEffect } from "react";
import { Preloader } from "@/components";
import { useThemeContext } from "@/context";
import { useViewPort } from "@/hooks";
import { MyLeftSidebar } from "./MyLeftSidebar/producerLeftSideBar";
import ProducerTopNavBar from "./MyTopNavbar/producerTopNavbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const { updateSideNavMode } = useThemeContext();
  const { width } = useViewPort();
  useEffect(() => {
    if (document.body && width <= 1024) {
      !document.body.classList.contains("enlarge-menu-all") &&
        document.body.classList.add("enlarge-menu-all");
    }
    return () => {
      document.body.classList.contains("enlarge-menu-all") &&
        document.body.classList.remove("enlarge-menu-all");
    };
  }, [width]);

  useEffect(() => {
    if (width < 1324) {
      updateSideNavMode("sm");
    } else if (width >= 1324) {
      updateSideNavMode("default");
    }
  }, [width]);
  return (
    <Suspense fallback={<div />}>
      <Suspense>
        <MyLeftSidebar />
      </Suspense>
      <div className="page-wrapper-admin" style={{}}>
        <Suspense fallback={<div />}>
          <ProducerTopNavBar />
        </Suspense>
        <div className="page-content pt-3">
          <div className="container-fluid">
            <Suspense fallback={<Preloader />}>{children}</Suspense>
          </div>
          <Suspense fallback={<div />}></Suspense>
        </div>
      </div>
    </Suspense>
  );
};

export const ProducerLayout = Layout;
