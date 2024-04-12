import "./Navigation.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Logo from "../imgs/logo.png";

function Navigation({ isLoggedIn, handleLogout }) {
  const devMaterial = [
    {
      name: "W3Schools",
      url: "https://www.w3schools.com/",
      divider: true,
    },
    {
      name: "React",
      url: "https://react.dev/",
      divider: false,
    },
    {
      name: "React-Bootstrap",
      url: "https://react-bootstrap.netlify.app/",
      divider: false,
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
      divider: false,
    },
    {
      name: "VS Shortcuts",
      url: "https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf",
      divider: false,
    },
    {
      name: "Icons",
      url: "https://icons8.com/icons",
      divider: false,
    },
    {
      name: "SAP Media Library",
      url: "https://brand.sap.com/media-library/index.html#/",
      divider: true,
    },
    {
      name: "Figma",
      url: "https://www.figma.com/file/Kns2jtso44qZ98EU9RUKXb/SemanTec-(Copy)?type=design&mode=design&t=yj9cZp3z3rYl3c8E-0",
      divider: false,
    },
    {
      name: "GitHub",
      url: "https://github.com/NaDu02/SemanTec",
      divider: true,
    },
    {
      name: "Notion",
      url: "https://www.notion.so/ba47ffe8392546d7b320103e80d73ed8?v=f99bf0b298164b46a970886e282291d7",
      divider: false,
    },
    {
      name: "Bewertungsbogen",
      url: "https://file.notion.so/f/f/aa48b8c5-adb3-43a9-a8b5-4fa922dff00a/85913285-2745-47f6-82ae-ba9fa8b17fbe/Bewertungsbogen_Web_Programmierung_WWI22SCB.pdf?id=ba9859b4-fb71-4b80-9136-dca8fc43631c&table=block&spaceId=aa48b8c5-adb3-43a9-a8b5-4fa922dff00a&expirationTimestamp=1711238400000&signature=-ecqtSaUTGv2TUEsZVxnuufj2kiXyd5zy235YMW_iEE&downloadName=Bewertungsbogen_Web_Programmierung_WWI22SCB.pdf",
      divider: false,
    },
    {
      name: "Fallstudie Absage",
      url: "https://file.notion.so/f/f/aa48b8c5-adb3-43a9-a8b5-4fa922dff00a/424466b4-dc39-4d8e-a8fb-5d9ba368bc80/Fallstudie_Abgabe.pdf?id=bfc1ba3f-58ec-451d-b7bc-009dd771c8fd&table=block&spaceId=aa48b8c5-adb3-43a9-a8b5-4fa922dff00a&expirationTimestamp=1711238400000&signature=nHuwWZn9xHJEg5O_6p3k5AZLgbSao_hPDHVuv0vXbpE&downloadName=Fallstudie_Abgabe.pdf",
      divider: false,
    },
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
        <Navbar.Brand href="index.html" className="navbar-brand">
          <img alt="Logo" src={Logo} className="logo" />
          SemanTec
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Dev-Material" id="dropdown-dev-material">
              {devMaterial.map((item, index) => (
                <React.Fragment key={`${index}-fragment`}>
                  <NavDropdown.Item
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </NavDropdown.Item>
                  {item.divider && <NavDropdown.Divider />}
                </React.Fragment>
              ))}
            </NavDropdown>
            <Nav.Link href="index.html">My results</Nav.Link>
            <Nav.Link href="index.html">News</Nav.Link>
            <Nav.Link href="index.html">Who we are</Nav.Link>
            <Nav.Link href="index.html">My profile</Nav.Link>
            <Nav.Link href="index.html" variant="info" size="sm">
              SysInsight
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {isLoggedIn && (
          <Button
            href="index.html"
            variant="outline-light"
            size="sm"
            className="ms-2"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
