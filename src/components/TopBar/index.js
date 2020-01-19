import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export default function TopBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">CryptStarter</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>

            <Button href="/NewCampaign">New Campaign</Button>

        </Navbar>
    );
}