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
import logoImg from "@/assets/images/logo-sm.png";
import useToggle from "@/hooks/useToggle";

export default function ProducerTopNavBar() {
  const { isOpen, toggle } = useToggle();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <img src={logoImg} height={26} className="mr-1" />
          </Link>
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
          <Collapse in={isOpen} className="navbar-collapse">
            <div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="#">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Link
                  </Link>
                </li>
                <li className="nav-item">
                  <NavBarDropdown />
                </li>
                <li className="nav-item">
                  <Link className="nav-link disabled" to="#" tabIndex={-1} aria-disabled="true">
                    Disabled
                  </Link>
                </li>
              </ul>
              <form className="d-flex">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="soft-primary" type="button" id="button-addon2">
                    <i className="fas fa-search" />
                  </Button>
                </div>
              </form>
            </div>
          </Collapse>
        </div>
      </nav>
    </>
  );
}

const NavBarDropdown = () => {
  return (
    <Dropdown>
      <DropdownToggle
        as="a"
        className="nav-link"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown <i className="la la-angle-down" />
      </DropdownToggle>
      <DropdownMenu aria-labelledby="navbarDropdown">
        <li>
          <DropdownItem href="#">Action</DropdownItem>
        </li>
        <li>
          <DropdownItem href="#">Another action</DropdownItem>
        </li>
        <li>
          <DropdownDivider />
        </li>
        <li>
          <DropdownItem href="#">Something else here</DropdownItem>
        </li>
      </DropdownMenu>
    </Dropdown>
  );
};
