import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomNav = () => {

    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        console.log(keycloak.authenticated);
    }, [initialized]);

    return (
        <Navbar bg="light" expand="lg" className="py-3" id="mainNav" sticky="top">
            <Container className="px-4 px-lg-5">
                <Navbar.Brand as={Link} to={"/"}>Gym JP</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarResponsive" />
                <Navbar.Collapse id="navbarResponsive">
                    <Nav className="ms-auto my-2 my-lg-0">
                        <Nav.Link href="#about">Nosotros</Nav.Link>
                        <Nav.Link as={Link} to={"/classes"}>Clases</Nav.Link>
                        <Nav.Link href="#portfolio">Horarios</Nav.Link>
                        <Nav.Link as={Link} to={"/trainers"}>Entrenadores</Nav.Link>
                        <Nav.Link as={Link} to={"/memberships"}>Membresías</Nav.Link>
                        <Nav.Link as={Link} to={"/progress"}>Progreso</Nav.Link>
                        <Nav.Link as={Link} to={"/contact"}>Contacto</Nav.Link>
                        {/* Si decides habilitar el botón de registro */}
                        <Nav.Item>
                <Button variant="primary" size="sm">Registrarse</Button>
              </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNav;