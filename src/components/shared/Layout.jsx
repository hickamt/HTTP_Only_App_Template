// CSS for pages located in App.css
import { useContext } from "react";
import { Container, Navbar, Nav, Button, Card } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

// All page-level components are read as 'children' and rendered
// inside the 'Container'
const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <Navbar className="navbar">
        <Navbar.Brand className="navbarBrand" as={Link} to="/">
          <img
            className="navLogo"
            src="/public/starwars.jpg"
            // width="35"
            // height="35"
            alt="Star Wars Logo"
          />
        </Navbar.Brand>

        {/* GET ALL EMPLOYEES */}
        <Nav>
          {user && (
            <Nav.Link as={Link} to="/employees">
              <h5 className="h5Text">Star Wars</h5>
            </Nav.Link>
          )}
        </Nav>

        {/* LOGIN */}
        <NavbarCollapse>
          <Nav className="ms-auto">
            {/* if (user) then show the users email in navbar as userName */}
            {user && (
              <Nav.Link className="navUserName">
                <h5 className="userNameText">{user?.email}</h5>
              </Nav.Link>
            )}
            {/* if (not user) then continue showing Login */}
            {!user && (
              <Nav.Link as={Link} to="/login">
            <Button
              className="navLogoutButton"
              variant="outline-secondary"
              type="button"
            >
              Login
            </Button>
              </Nav.Link>
            )}
          </Nav>
        </NavbarCollapse>

        {/* LOGOUT */}
        <Nav className="ms-auto">
          {user && (
            <Button
              className="navLogoutButton"
              variant="outline-secondary"
              type="button"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          )}
        </Nav>
      </Navbar>
      <Container className="childContainer">
        {children}
        <Card.Footer>
          <p className="layoutFooter">
            Images From | The Official Star Wars Website." StarWars, 8 Jan.
            2023,
            <a href="https://www.starwars.com" target="_blank">
              www.starwars.com
            </a>
          </p>
        </Card.Footer>
      </Container>
    </>
  );
};
export default Layout;
