import {
  Collapse,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from '@/context'
import logoImg from "@/assets/images/logo-sm.png";
import useToggle from "@/hooks/useToggle";
import { useState } from "react";

export default function ProducerTopNavBar() {
	const { isAuthenticated, user } = useAuthContext();
	const [ loggedIn, setLogged ] = useState<boolean>(isAuthenticated)
  const { isOpen, toggle } = useToggle();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="px-5 container-fluid">
          <Collapse in={isOpen} className="navbar-collapse ">
            <div>
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="mx-2 my-2 nav-item">
                  Welcome {user?.username}
                </li>
                <li className="mx-2 my-2 nav-item">
                  {new Date().toLocaleDateString("vn-VN")}
                </li>
              </ul>
            </div>
          </Collapse>

          <button
            onClick={toggle}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent2"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
    </>
  );
}

