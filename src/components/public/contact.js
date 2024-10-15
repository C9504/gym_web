import React, { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Alert } from "react-bootstrap";
import { apiRequest } from "../../services/config";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

const Contact = () => {

    const { keycloak, initialized } = useKeycloak();

    const [validated, setValidated] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    ///const [reservations, setReservations] = useState([]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
            setShowErrorMessage(true);
        } else {
            setValidated(true);
            setShowSuccessMessage(true);
        }
    }

    useEffect(() => {
        getReservations();
    }, []);

    const getReservations = async () => {
        await axios.get(`${apiRequest()}/reservations`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            //setReservations(res.data);
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Container className="px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-lg-8 col-xl-6 text-center">
                    <h2 className="mt-0">Pongamonos en contacto</h2>
                    <hr className="divider" />
                    <p className="text-white mb-5">¿Listo para comenzar tu próxima meta con nosotros? Envíanos un mensaje y te responderemos lo antes posible para ayudarte a alcanzar tus objetivos de fitness.</p>
                </div>
            </div>
            <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                <div className="col-lg-6">
                    <Form id="contactForm" noValidate validated={validated} onSubmit={handleSubmit}>
                        {/* Nombre completo */}
                        <FloatingLabel controlId="name" label="Nombre completo" className="mb-3">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your name..."
                            />
                            <Form.Control.Feedback type="invalid">
                                A name is required.
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        {/* Email */}
                        <FloatingLabel controlId="email" label="Email" className="mb-3">
                            <Form.Control
                                required
                                type="email"
                                placeholder="name@example.com"
                            />
                            <Form.Control.Feedback type="invalid">
                                An email is required.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Email is not valid.
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        {/* Teléfono/Celular */}
                        <FloatingLabel controlId="phone" label="Teléfono/Celular" className="mb-3">
                            <Form.Control
                                required
                                type="tel"
                                placeholder="(123) 456-7890"
                            />
                            <Form.Control.Feedback type="invalid">
                                A phone number is required.
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        {/* Mensaje */}
                        <FloatingLabel controlId="message" label="Mensaje" className="mb-3">
                            <Form.Control
                                required
                                as="textarea"
                                placeholder="Enter your message here..."
                                style={{ height: '10rem' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                A message is required.
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        {/* Mensaje de éxito */}
                        {showSuccessMessage && (
                            <Alert variant="success" className="text-center mb-3">
                                <strong>Form submission successful!</strong>
                                To activate this form, sign up at
                                <br />
                                <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                            </Alert>
                        )}

                        {/* Mensaje de error */}
                        {showErrorMessage && (
                            <Alert variant="danger" className="text-center mb-3">
                                Error sending message!
                            </Alert>
                        )}

                        {/* Botón de enviar */}
                        <div className="d-grid">
                            <Button type="submit" variant="primary" size="lg">
                                Enviar
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-lg-4 text-center mb-5 mb-lg-0">
                    <i className="bi-phone fs-2 mb-3 text-muted"></i>
                    <div>+57 317 828 1938</div>
                </div>
            </div>
        </Container>
    );
};

export default Contact;