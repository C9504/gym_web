import React, { useState } from "react";
import axios from "axios";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { apiRequest } from "../../services/config";
import { useKeycloak } from "@react-keycloak/web";

const Register = () => {

    const { keycloak, initialized } = useKeycloak();

    const [registering, setRegistering] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [exists, setExists] = useState(false);
    const [request, setRequest] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        enabled: true,
        emailVerified: false,
        requiredActions: [

        ],
        credentials: [
            {
                type: "password",
                value: "",
                temporary: true
            }
        ]
    });

    const register = async (event) => {
        event.preventDefault();
        setRegistering(true);
        const toastId = toast.loading("Registrando...", { hideProgressBar: false, position: "bottom-center" });
        await axios.post(`${apiRequest()}/auth/member/register`, request, { withCredentials: false }).then((res) => {
            if (res.status === 200) {
                event.target.reset();
                console.log(initialized);
                setRegistering(false);
                setRegistered(true);
                toast.update(toastId, { render: res.data, hideProgressBar: true, type: "success", isLoading: false, autoClose: 5000, closeOnClick: true });
            }
        }).catch((err) => {
            if (err?.response?.status === 409) {
                setExists(true);
                toast.update(toastId, { render: err?.response?.data, type: "error", isLoading: false, autoClose: 5000, closeOnClick: true });
            } else {
                toast.update(toastId, { render: "Error: por favor revisa que los datos sean correctos e intenta de nuevo", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true });
            }
            console.log(err?.response);
            setRegistering(false);
            setRegistered(false);
            //toast.update(toastId, { render: "Error: por favor revisa que los datos sean correctos e intenta de nuevo", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true });
        });
    };

    return (
        <Container>
            <Form onSubmit={register}>
                <div className="text-center mt-5">
                    <h1 className="h3 mb-3 fw-normal">Unirme a Gym JP</h1>
                    <p style={{ fontSize: '12px' }}>Por favor, complete los siguientes datos y verifique que los datos sean correctos</p>
                </div>
                <h3 className="mb-3">Datos de contacto</h3>

                <Row className="mb-3">
                    <Col xs={12} md={4}>
                        <Form.Label><span className="text-danger">*</span> Username</Form.Label>
                        <Form.Control
                            type="text"
                            size="sm"
                            value={request?.username}
                            onChange={(e) => setRequest({ ...request, username: e.target.value })}
                            minLength={4}
                            maxLength={20}
                            placeholder="Username"
                            disabled={registering}
                            required
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Label><span className="text-danger">*</span> Email</Form.Label>
                        <Form.Control
                            type="email"
                            size="sm"
                            value={request?.email}
                            onChange={(e) => setRequest({ ...request, email: e.target.value })}
                            maxLength={255}
                            placeholder="Email"
                            disabled={registering}
                            required
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Label><span className="text-danger">*</span> Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            size="sm"
                            value={request?.credentials[0]?.value}
                            onChange={(e) => {
                                const newCredentials = [...request.credentials];
                                newCredentials[0].value = e.target.value;
                                setRequest({ ...request, credentials: newCredentials });
                            }}
                            placeholder="Contraseña"
                            disabled={registering}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={12} md={6}>
                        <Form.Label><span className="text-danger">*</span> Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            size="sm"
                            value={request?.firstName}
                            onChange={(e) => setRequest({ ...request, firstName: e.target.value })}
                            placeholder="Nombre"
                            disabled={registering}
                            required
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Label><span className="text-danger">*</span> Apellidos</Form.Label>
                        <Form.Control
                            type="text"
                            size="sm"
                            value={request?.lastName}
                            onChange={(e) => setRequest({ ...request, lastName: e.target.value })}
                            placeholder="Apellidos"
                            disabled={registering}
                            required
                        />
                    </Col>
                </Row>

                {exists && (
                    <Alert variant="danger" onClose={() => setExists(false)} dismissible>
                        <Alert.Heading>Correo electrónico o nombre de usuario ya registrado!</Alert.Heading>
                        <p>El correo electrónico o el nombre de usuario que has ingresado ya están en uso. Por favor, intenta con un correo electrónico o nombre de usuario diferente o inicia sesión si ya tienes una cuenta.</p>
                    </Alert>
                )}

                {registered && (
                    <Button variant='primary' className="w-100 py-2 btn-sm" onClick={() => keycloak.login({ redirectUri: window.location.origin, locale: 'es-ES' })} size="lg">Te has unido a Gym JP. INGRESAR</Button>
                )}

                {!registered && (
                    <Button variant="primary" className="w-100 py-2 btn-sm" type="submit" disabled={registering}>{registering ? 'Unión en curso, por favor espere...' : 'Unirme ahora'}</Button>
                )}
            </Form>
            <ToastContainer />
        </Container>
    );
};

export default Register;