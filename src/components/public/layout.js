import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { apiRequest } from "../../services/config";

const Layout = () => {

    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        const sse = new EventSource(`${apiRequest()}/sse/payments/sse`, { withCredentials: false });
        sse.onopen = (event) => {
            console.log(event);
        }
        sse.onmessage = (event) => {
            console.log(event.data);
        };

        sse.onerror = (event) => {
            console.log(event);
        };
    }, [initialized]);

    useEffect(() => {
        if (initialized) {
            keycloak.loadUserProfile().then((userProfile) => {
                console.log(initialized);
                console.log(userProfile?.emailVerified);
            });
            console.log(keycloak?.tokenParsed?.resource_access?.gym_web?.roles[0]);
        }
    }, [initialized]);

    return (
        <>
            <Navbar bg="light" expand="lg" className="py-3" id="mainNav" sticky="top">
                <Container fluid className="px-4 px-lg-5">
                    <Navbar.Brand as={Link} to={"/"}>
                        <img
                            src={"/icon.png"}
                            alt="Icon"
                            style={{ width: '30px', height: '30px', marginRight: '8px' }} // Ajusta el tamaño del ícono si es necesario
                        /> Gym JP {keycloak.authenticated && (
                            <sub className="text-danger">{keycloak?.tokenParsed?.resource_access?.gym_web?.roles[0]}</sub>
                        )}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarResponsive" />
                    <Navbar.Collapse id="navbarResponsive">
                        <Nav className="ms-auto my-2 my-lg-0">
                            <Nav.Link as={Link} to={"/"}>Inicio</Nav.Link>
                            <Nav.Link as={Link} to={"/plans"}>Programas</Nav.Link>
                            {keycloak.hasResourceRole('admin') && (
                                <>
                                    <Nav.Link as={Link} to={"/admin/classes"}>Clases</Nav.Link>
                                    <Nav.Link as={Link} to={"/admin/members"}>Miembros</Nav.Link>
                                    <Nav.Link as={Link} to={"/admin/trainers"}>Entrenadores</Nav.Link>
                                    <Nav.Link as={Link} to={"/admin/subscriptions"}>Suscripciones</Nav.Link>
                                </>
                            )}
                            {keycloak.hasResourceRole('member') && (
                                <>
                                    {/* <Nav.Link as={Link} to={"/progress"}>Progreso</Nav.Link> */}
                                    {/* <Nav.Link as={Link} to={"/reservations"}>Reservas</Nav.Link> */}
                                    <Nav.Link as={Link} to={"/subscriptions"}>Suscripciones</Nav.Link>
                                </>
                            )}
                            <Nav.Link as={Link} to={"/about-us"}>Nosotros</Nav.Link>
                            <Nav.Link as={Link} to={"/classes"}>Clases</Nav.Link>
                            {/* <Nav.Link href="#portfolio">Horarios</Nav.Link> */}
                            {/* <Nav.Link as={Link} to={"/trainers"}>Entrenadores</Nav.Link> */}
                            {/* <Nav.Link as={Link} to={"/memberships"}>Membresías</Nav.Link> */}
                            <Nav.Link as={Link} to={"/contact"}>Contacto</Nav.Link>
                            {!keycloak.authenticated && (
                                <Nav.Link as={Link} to={"/register"} className="btn bg-primary text-white">¡Unete ya!</Nav.Link>
                            )}
                            {keycloak.authenticated && (
                                <NavDropdown title={<span><i className="bi bi-person-circle text-danger" /> {keycloak?.profile?.firstName}</span>} id="basic-nav-dropdown-settings">
                                    {!keycloak.hasResourceRole('admin') && (
                                        <NavDropdown.Item as={Link} to={"/profile"}><i className="bi bi-person text-danger"></i> Perfil</NavDropdown.Item>
                                    )}
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