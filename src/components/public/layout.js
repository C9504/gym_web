import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Layout = () => {

    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        if (initialized) {
            keycloak.loadUserProfile().then((userProfile) => {
                console.log(initialized);
                console.log(userProfile.id);
            });
            console.log(keycloak.hasResourceRole('member'));
        }
    }, [initialized]);

    const register = async() => {
        window.location.href = await keycloak.createRegisterUrl({ redirectUri: window.location.origin, locale: 'es-ES' });
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className="py-3" id="mainNav" sticky="top">
                <Container className="px-4 px-lg-5">
                    <Navbar.Brand as={Link} to={"/"}>
                        <img
                            src={"/icon.png"}
                            alt="Icon"
                            style={{ width: '30px', height: '30px', marginRight: '8px' }} // Ajusta el tamaño del ícono si es necesario
                        /> Gym JP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarResponsive" />
                    <Navbar.Collapse id="navbarResponsive">
                        <Nav className="ms-auto my-2 my-lg-0">
                            <Nav.Link as={Link} to={"/about-us"}>Nosotros</Nav.Link>
                            <Nav.Link as={Link} to={"/classes"}>Clases</Nav.Link>
                            <Nav.Link href="#portfolio">Horarios</Nav.Link>
                            <Nav.Link as={Link} to={"/trainers"}>Entrenadores</Nav.Link>
                            {/* <Nav.Link as={Link} to={"/memberships"}>Membresías</Nav.Link> */}
                            {keycloak.hasResourceRole('member') && (
                                <>
                                    <Nav.Link as={Link} to={"/progress"}>Progreso</Nav.Link>
                                    <Nav.Link as={Link} to={"/reservations"}>Reservas</Nav.Link>
                                </>
                            )}
                            <Nav.Link as={Link} to={"/contact"}>Contacto</Nav.Link>
                            {!keycloak.authenticated && (
                                <Nav.Item>
                                    <Button variant="primary" size="sm" onClick={() => register()}>Unirme</Button>
                                </Nav.Item>
                            )}
                            {keycloak.authenticated && (
                                <NavDropdown title={<span><i className="bi bi-person-circle text-danger" /> {keycloak?.profile?.firstName}</span>} id="basic-nav-dropdown-settings">
                                    <NavDropdown.Item as={Link} to={"/profile"}><i className="bi bi-person text-danger"></i> Perfil</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => keycloak.logout({ redirectUri: `${window.location.origin}` })}><i className="bi bi-x-lg text-danger"></i> Cerrar sesión</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="gym-background-img"></div>
            <div className="gym-content">
                <Outlet />
            </div>
        </>
    );

}
export default Layout;