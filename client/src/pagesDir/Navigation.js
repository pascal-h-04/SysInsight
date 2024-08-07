import "./Navigation.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Logo from "../imgs/logo.png";
import { FaUser, FaInfoCircle } from "react-icons/fa";

function Navigation({ isLoggedIn, isAdmin, handleLogout }) {
  const navigate = useNavigate();

  const adminNavigation = [
    { name: "Angebotsübersicht", url: "/angebotseite", divider: false },
    { name: "Usermanagement", url: "/usermanagement", divider: false },
  ];

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img alt="SemanTec Logo" src={Logo} className="logo" />
          SemanTec
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-left-spacing">
            {isAdmin && (
              <NavDropdown title="Admin-Navigation">
                {adminNavigation.map((item, index) => (
                  <React.Fragment key={`${index}-fragment`}>
                    <NavDropdown.Item as={Link} to={item.url}>
                      {item.name}
                    </NavDropdown.Item>
                    {item.divider && <NavDropdown.Divider />}
                  </React.Fragment>
                ))}
              </NavDropdown>
            )}
            <>
              <div className="nav-left-spacing" />
              <Nav.Link as={Link} to="/about-us" className="me-3">
                <FaInfoCircle size={20} /> About Us
              </Nav.Link>
            </>
          </Nav>
        </Navbar.Collapse>
        {isLoggedIn && isAdmin && (
          <span className="ms-2" style={{ color: "white" }}>
            Admin-View
          </span>
        )}

        {isLoggedIn ? (
          <Button
            variant="outline-light"
            size="sm"
            className="ms-2"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
              navigate("/");
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="outline-light"
            size="sm"
            className="ms-2"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
