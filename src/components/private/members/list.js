import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import moment from "moment-timezone";
import { apiRequest } from "../../../services/config";

const ListMembers = () => {

    const { keycloak, initialized } = useKeycloak();
    const [allMembers, setAllMembers] = useState([]);

    useEffect(() => {
        getAllMembers();
    }, []);

    const getAllMembers = async () => {
        await axios.get(`${apiRequest()}/members`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            setAllMembers(res.data);
            console.log(initialized);
        }).catch((error) => {
            console.log(error?.response?.status);
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="mt-5 mb-3">Members</h1>
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
                            {allMembers.map((subscription, index) => (
                                <tr key={subscription.id}>
                                    <td>{index + 1}</td>
                                    <td>{subscription?.plan?.name}</td>
                                    <td>{subscription?.plan?.duration}</td>
                                    <td>{moment(subscription.startDate).tz('America/Bogota').format('D [de] MMMM [de] YYYY [a las] HH:mm A')}</td>
                                    <td>{moment(subscription?.endDate).tz('America/Bogota').format('D [de] MMMM [de] YYYY [a las] HH:mm A')}</td>
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

export default ListMembers;