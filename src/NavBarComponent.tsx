import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

type NavBarComponentProps = {
    onRestart: (event: React.MouseEvent<HTMLAnchorElement>) => void,
}

function NavBarComponent(props: NavBarComponentProps) {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Site Clearing Simulator</Navbar.Brand>
                <Nav>
                    <Nav.Link onClick={props.onRestart}>Restart</Nav.Link>
                </Nav>
        </Navbar>
    );
}

export default NavBarComponent