import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import AppMenu from "./Menu";
import { getMenuItems } from "@/common";

import logoSM from "/logo-sm.png";
import logoImg from "/logo.png";

const LeftSidebar = () => {
  return (
    <div className="left-sidenav">
      <div className="brand">
        <Link to="/" className="logo">
          <div className="d-flex gap-1 justify-content-center">
            <span>
              <img src={logoSM} alt="logo-small" className="logo-sm" />
            </span>
            <span>
              <img src={logoImg} alt="logo-large" className="logo-lg logo-light" />
            </span>
          </div>
        </Link>
      </div>

      <SimpleBar className="menu-content h-100">
        <AppMenu menuItems={getMenuItems()} />

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
          <h5 className="mt-3">Mannat Themes</h5>
          <p className="mb-3">We Design and Develop Clean and High Quality Web Applications</p>
          <Link to="" className="btn btn-outline-warning btn-sm">
            Upgrade your plan
          </Link>
        </div>
      </SimpleBar>
    </div>
  );
};

export default LeftSidebar;
