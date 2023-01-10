import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Champions from "./components/sites/champions/Champions";
import Home from "./components/sites/home/Home";
import Items from "./components/sites/items/Items";
import {Nav, Navbar, NavLink} from "react-bootstrap";
import Quiz from "./components/sites/quitz/Quiz";

function App() {
    return (
    <>
        <BrowserRouter>
                <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="navbarScrools" data-bs-target="#navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav>
                            <NavLink eventKey="1" as={Link} to="/">Home</NavLink>
                            <NavLink eventKey="2" as={Link} to="/champions">Champions</NavLink>
                            <NavLink eventKey="3" as={Link} to="/items">Items</NavLink>
                            <NavLink eventKey="4" as={Link} to="/quiz">Quiz</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="container">
                    <Switch>
                        <Route path='/champions' component={Champions}/>
                        <Route path='/items' component={Items}/>
                        <Route path='/quiz' component={Quiz}/>
                        <Route exact path='/' component={Home}/>
                    </Switch>
                </div>
        </BrowserRouter>
    </>
    );
}

export default App;
