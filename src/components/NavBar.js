import {Nav, Navbar, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";

function Navigation(){
    return(
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="navbarScrools" data-bs-target="#navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav>
                    <NavLink eventKey="1" as={Link} to="/">Home</NavLink>
                    <NavLink eventKey="2" as={Link} to="/champions">Champions</NavLink>
                    <NavLink eventKey="3" as={Link} to="/items">Items</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;