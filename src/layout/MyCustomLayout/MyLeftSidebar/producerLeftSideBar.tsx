import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
// import AppMenu from "./Menu";
import { getMenuItems } from "@/common";
import logoImg from "@/assets/images/logo-sm.png";
import AppMenu from "@/layout/LeftSidebar/Menu";
import { MenuItemType } from "@/common/menu";
import { useAuthContext } from '@/context'
import { useNavigate } from 'react-router-dom'
import { FiMusic, FiUsers, FiTag, FiShoppingCart, FiFileText, FiPower, FiCalendar, FiBell } from "react-icons/fi";
const leftMenuItems: MenuItemType[] = [
  {
    key: "1",
    label: "Tracks",
    isTitle: false,
    icon: FiMusic,
    url: "/producer-page/my-music",
  },
  {
    key: "3",
    label: "Publishing",
    isTitle: false,
    icon: FiCalendar,
    url: "/producer-page/my-publish",
  },
  {
    key: "5",
    label: "Tags",
    isTitle: false,
    icon: FiTag,
    url: "/producer-page/my-tag",
  },
  {
    key: "7",
    label: "Licences",
    isTitle: false,
    icon: FiFileText,
    url: "/producer-page/my-license",
  },
  {
    key: "8",
    label: "Notification",
    isTitle: false,
    icon: FiBell,
    url: "/producer-page/my-notification",
  },
  {
    key: "4",
    label: "Sale",
    isTitle: false,
    icon: FiShoppingCart,
    url: "/producer-page/my-sale",
  },

  {
    key: "6",
    label: "Users",
    icon: FiUsers,
    url: "/producer-page/my-app-user",
  },
];

const LeftSidebar = () => {
  const navigate = useNavigate()
	const { removeSession } = useAuthContext()
  const logout = () => {
    removeSession()
    setTimeout(() => {
      navigate('/auth/login')
    }, 500)
  }
  return (
    <div className="left-sidenav-admin">
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
        <hr></hr>
        <div style={{ margin: "0px 20%", cursor: "pointer" }}>
          <div onClick={() => logout()} className="text-center btn-outline-secondary p-2" style={{ fontSize: "22px", borderRadius: "16px" }}><FiPower />Logout</div>
        </div>
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
