import { Suspense, lazy, type ReactNode, useEffect } from "react";
import { Preloader } from "@/components";
import { useThemeContext } from "@/context";
import { useViewPort } from "@/hooks";
import MyTopNavbar from "./MyTopNavbar";
const TopNavbar = lazy(() => import("../TopNavbar"));
const Footer = lazy(() => import("../Footer"));
// const LeftSideBar = lazy(() => import("./LeftSidebar"));

const Layout_NoSidebar = ({ children }: { children: ReactNode }) => {
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
    updateSideNavMode("sm");
    // if (width < 1324) {
    //   updateSideNavMode("sm");
    // } else if (width >= 1324) {
    //   updateSideNavMode("default");
    // }
  }, [width]);
  return (
    <Suspense fallback={<div />}>
      <div className="page-wrapper">
        <Suspense fallback={<div />}>
          <MyTopNavbar />
        </Suspense>
        <div className="page-content">
          <div className="container-fluid">
            <Suspense fallback={<Preloader />}>{children}</Suspense>
          </div>
          <Suspense fallback={<div />}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </Suspense>
  );
};

export default Layout_NoSidebar;
