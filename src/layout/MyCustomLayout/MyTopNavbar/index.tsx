import {
  Collapse,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLogo from "../../assets/images/logo-sm.png";
import useToggle from "@/hooks/useToggle";
export default function MyTopNavbar() {
  const { isOpen, toggle } = useToggle();
  return (
    <>
      <Container fluid className="mb-2" style={{ padding: "0" }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="#">
              <img src={AppLogo} height={80} className="mr-1" />
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
            <Collapse in={isOpen} className="navbar-collapse  ">
              <div className="d-flex flex-row justify-content-between ">
                <form className="d-flex " style={{ width: "45%" }}>
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
                <ul className="navbar-nav  mb-2 mb-lg-0 ">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="#">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      Track Explore
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
              </div>
            </Collapse>
          </div>
        </nav>
      </Container>
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
          <DropdownItem href="#">Action 1</DropdownItem>
        </li>
        <li>
          <DropdownItem href="#">Action 2</DropdownItem>
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
