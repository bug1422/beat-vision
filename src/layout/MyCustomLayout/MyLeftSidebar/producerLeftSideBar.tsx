import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
// import AppMenu from "./Menu";
import { getMenuItems } from "@/common";
import logoImg from "@/assets/images/logo-sm.png";
import AppMenu from "@/layout/LeftSidebar/Menu";
import { MenuItemType } from "@/common/menu";
import { FiMusic } from "react-icons/fi";
const leftMenuItems: MenuItemType[] = [
  {
    key: "1",
    label: "my music",
    isTitle: false,
    icon: FiMusic,
    url: "/user/id/producer-page/my-music",
  },
  {
    key: "3",
    label: "my publish",
    isTitle: false,
    icon: FiMusic,
    url: "/user/id/producer-page/my-publish",
  },
  {
    key: "4",
    label: "my sale",
    isTitle: false,
    icon: FiMusic,
    url: "#",
  },
];

const LeftSidebar = () => {
  return (
    <div className="left-sidenav">
      <div className="brand">
        <Link to="/" className="logo">
          <div className="d-flex gap-1 justify-content-center">
            <span>
              <img src={logoImg} alt="logo-large" className="" style={{ width: "100px" }} />
            </span>
          </div>
        </Link>
      </div>

      <SimpleBar className="menu-content h-100">
        {/* <AppMenu menuItems={getMenuItems()} /> */}
        <AppMenu menuItems={leftMenuItems} />
        <div className="update-msg text-center">
          <Link
            to=""
            className="float-end close-btn text-white"
            data-dismiss="update-msg"
            aria-label="Close"
            aria-hidden="true"
          >
            <i className="mdi mdi-close"></i>
          </Link>
          {/* <h5 className="mt-3">Mannat Themes</h5>
          <p className="mb-3">We Design and Develop Clean and High Quality Web Applications</p>
          <Link to="" className="btn btn-outline-warning btn-sm">
            Upgrade your plan
          </Link> */}
        </div>
      </SimpleBar>
    </div>
  );
};

export const MyLeftSidebar = LeftSidebar;
