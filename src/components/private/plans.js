import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { Button, Card, Col, Container, Form, Row, ProgressBar } from "react-bootstrap";
import { apiRequest } from "../../services/config";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Plan = () => {

    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [plans, setPlans] = useState([]); // Estado para el plan seleccionado
    const [member, setMember] = useState({});
    const [subscription, setSubscription] = useState({
        plan: {
            id: ''
        },
        member: {
            id: ''
        },
        startDate: moment().add(1, 'days').format('YYYY-MM-DD 07:00'),
        endDate: '',
    });
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        getPlans();
    }, []);

    const isFormValid = subscription.startDate && subscription.endDate;

    const handleSelectPlan = (id) => {
        setSelectedPlan(id); // Actualiza el plan seleccionado
        if (!keycloak.authenticated) {
            keycloak.login();
        }
        handleNextStep();
    };

    const handleNextStep = () => {
        if (!keycloak.authenticated) {
            keycloak.login();
        }
        getProfile();
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(subscription);
        const toastId = toast.loading("Actualizando...", { hideProgressBar: false, position: "bottom-center" });
        await axios.post(`${apiRequest()}/subscriptions/register`, {
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            member: member,
            plan: {
                id: selectedPlan
            }
        }, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            navigate("/subscriptions");
            toast.update(toastId, { render: "Operación realizada con exito", hideProgressBar: true, type: "success", isLoading: false, autoClose: 5000, closeOnClick: true });
        }).catch((_err) => {
            toast.update(toastId, { render: "Error: por favor revisa que los datos sean correctos e intenta de nuevo", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true });
        });
    };

    const getPlans = async () => {
        await axios.get(`${apiRequest()}/plans`, { /*headers: { Authorization: `Bearer ${keycloak.token}` },*/ withCredentials: false }).then((res) => {
            setPlans(res.data);
            console.log(initialized);
        }).catch((error) => {
            console.log(error?.response?.status);
        });
    };

    const getProfile = async () => {
        await axios.get(`${apiRequest()}/members/me`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            setMember(res.data);
        }).catch((error) => {
            console.log(error?.response?.status);
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="mt-5 mb-3">Subscripción a programa {selectedPlan ? ` - ${plans.find(plan => plan.id === selectedPlan).name}` : ''}</h1>
                </Col>
            </Row>

            {keycloak.authenticated && (
                <ProgressBar now={currentStep * 50} label={`Paso ${currentStep} de 2`} className="mb-4" />
            )}

            {currentStep === 1 && (
                <>
                    <Row className="justify-content-center mt-5">
                        {plans.map((plan) => (
                            <Col key={plan.id} md={4} className="mb-4">
                                <Card
                                    key={plan.id}
                                    className={`shadow-sm text-center plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
                                    onClick={() => handleSelectPlan(plan.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Card.Body>
                                        <Card.Title className="plan-name">{plan.name}</Card.Title>
                                        <div className="plan-price">
                                            {plan?.price?.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}<sub>/{plan.duration}</sub>
                                        </div>
                                        {plan.id === selectedPlan && (
                                            <ul className="plan-features">
                                                {plan.description.split(';').map((feature, index) => (
                                                    <li key={index} className="available-feature text-start">
                                                        <i className="bi bi-check-circle-fill"></i> {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {selectedPlan === plan.id ? (
                                            <Button variant="primary shadow" size="sm" className="order-btn mt-3" disabled>
                                                <i className="bi bi-check-circle-fill"></i>{' '}
                                                Seleccionado
                                            </Button>
                                        ) : (
                                            <Button variant="primary shadow" size="sm" className="order-btn mt-3">
                                                Seleccionar
                                            </Button>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    {keycloak.authenticated && (
                        <div className="d-flex justify-content-between mt-3">
                            <Button variant="secondary" disabled>
                                Anterior
                            </Button>
                            <Button variant="primary" onClick={handleNextStep} disabled={!selectedPlan}>
                                Siguiente
                            </Button>
                        </div>
                    )}
                </>
            )}

            {currentStep === 2 && (
                <>
                    <Row>
                        <Col>
                            <h2>Selecciona tu horario</h2>
                            <p className="text-white">Esta fecha y hora es la hora de inicio diaria de tu rutina (este será el horario de todos los dias)</p>
                        </Col>
                    </Row>
                    <Row>
                        <Form className="mt-4" onSubmit={onSubmit}>
                            <Col xs={12} md={6}>
                                <Form.Label>Fecha de inicio</Form.Label>
                                <Form.Control
                                    min={moment().format('YYYY-MM-DD HH:mm A')}
                                    type="datetime-local"
                                    value={subscription?.startDate}
                                    onChange={(e) =>  { 
                                        setSubscription({ ...subscription, startDate: e.target.value, endDate: moment(e.target.value).add(1.5, 'hours').format('YYYY-MM-DDTHH:mm') })
                                    }}
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Label>Fecha de finalización</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    value={subscription?.endDate}
                                    onChange={(e) => setSubscription({ ...subscription, endDate: e.target.value })}
                                    readOnly
                                />
                            </Col>
                        </Form>
                    </Row>
                    <div className="d-flex justify-content-between mt-3">
                        <Button variant="secondary" onClick={handlePreviousStep}>
                            Anterior
                        </Button>
                        <Button variant="primary" onClick={onSubmit} disabled={!isFormValid}>
                            Confirmar y Pagar
                        </Button>
                    </div>
                </>
            )}
            <ToastContainer />
        </Container>
    );
};

export default Plan;