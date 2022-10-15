import React from "react";

import { Link } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { useAuth } from "@/stores/auth";

import { Authorization } from "../Authorization";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export const DefaultLayout = (props: DefaultLayoutProps) => {
  const auth = useAuth();

  const logout = () => {
    auth.logout();
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/auth/login">
                Auth
              </Nav.Link>
            </Nav>
            <Authorization>
              <Navbar.Text>
                Signed in as: <strong>{auth.user.username}</strong>
                <Button variant="primary" onClick={logout} className="ms-1">
                  Logout
                </Button>
              </Navbar.Text>
            </Authorization>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-2">
        {props.children}
        <hr></hr>
        Version: v{__VERSION__}
      </Container>
    </>
  );
};
