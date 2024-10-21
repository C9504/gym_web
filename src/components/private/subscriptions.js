import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { apiRequest } from "../../services/config";
import moment from "moment-timezone";

const Subscriptions = () => {

    const { keycloak, initialized } = useKeycloak();
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        getPlans();
    }, []);

    const getPlans = async () => {
        await axios.get(`${apiRequest()}/subscriptions/me`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            setSubscriptions(res.data);
            console.log(initialized);
        }).catch((error) => {
            console.log(error?.response?.status);
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="mt-5 mb-3">Mis suscripciones</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Plan</th>
                                <th>Duración</th>
                                <th>Inicio</th>
                                <th>Finalización</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((subscription, index) => (
                                <tr key={subscription.id}>
                                    <td>{index + 1}</td>
                                    <td>{subscription?.plan?.name}</td>
                                    <td>{subscription?.plan?.duration}</td>
                                    <td>{moment(subscription.startDate).tz('America/Bogota').format('D [de] MMMM [de] YYYY')}</td>
                                    <td>{moment(subscription?.endDate).tz('America/Bogota').format('D [de] MMMM [de] YYYY')}</td>
                                    <td>{subscription?.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Subscriptions;