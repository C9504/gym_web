import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { apiRequest } from "../../../services/config";
import CreateMembers from "./create";
import EditMember from "./edit";

const ListSubscriptions = () => {

    const { keycloak, initialized } = useKeycloak();
    const [list, setList] = useState([]);
    const [newData, setNewData] = useState(false);
    const [update, setUpdate] = useState(false);
    const [data, setData] = useState({});
    const [members, setMembers] = useState([]);
    const [plans, setPlans] = useState([]);
    const [saved, setSaved] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [message, setMessage] = useState("Message here");
    const [type, setType] = useState("success");
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        getAll();
        getAllMembers();
        getAllPlans();
    }, []);

    useEffect(() => {
        if (finished) {
            getAll();
            getAllMembers();
            getAllPlans();
        }
    }, [finished]);

    const handleNew = () => {
        setNewData(!newData);
        setUpdate(false);
        setUpdated(false);
        setSaved(false);
    };

    const handleEdit = (data) => {
        setNewData(false);
        setData(data);
        setUpdated(false);
        setUpdate(true);
        setSaved(false);
    };

    const getAll = async () => {
        await axios.get(`${apiRequest()}/subscriptions`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            setList(res.data);
            setFinished(false);
            console.log(initialized);
        }).catch((error) => {
            console.log(error?.response?.status);
        });
    };

    const getAllMembers = async () => {
        await axios.get(`${apiRequest()}/members`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            const server = res.data;
            const transformed = server.map((data) => ({
                value: data,
                label: `${data.name} | ${data.lastName} | ${data.phone} - ${data?.email}`,
                key: data.id
            }));
            const withDefault = [
                { value: '', label: 'Selecciona un Miembro', key: 0 },
                ...transformed
            ];
            setMembers(withDefault);
            setFinished(false);
            console.log(initialized);
        }).catch((error) => {
            console.log(error?.response?.status);
        });
    };

    const getAllPlans = async () => {
        await axios.get(`${apiRequest()}/plans`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            const server = res.data;
            const transformed = server.map((data) => ({
                value: data,
                label: `${data.name} | ${data.description} | ${data.duration} - ${data?.price} COP`,
                key: data.id
            }));
            const withDefault = [
                { value: '', label: 'Selecciona un Plan', key: 0 },
                ...transformed
            ];
            setPlans(withDefault);
            setFinished(false);
            console.log(initialized);
        }).catch((error) => {
            console.log(error?.response?.status);
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="mt-5 mb-3">Suscripciones</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="float-end align-self-center mb-3" variant="primary" size="sm" onClick={handleNew}>
                        {newData ? "Cancelar" : "Nueva Subscripción"}
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    {newData && (
                        <CreateMembers setNew={setNewData} setSaved={setSaved} setFinished={setFinished} members={members} plans={plans} setMessage={setMessage} setType={setType} />
                    )}
                    {update && (
                        <EditMember setUpdate={setUpdate} setUpdated={setUpdated} setFinished={setFinished} data={data} members={members} plans={plans} setMessage={setMessage} setType={setType} />
                    )}
                    <Alert variant={type} show={saved} onClose={() => setSaved(!saved)} dismissible>
                        {message}
                    </Alert>
                    <Alert variant="success" show={updated} onClose={() => setUpdated(!updated)} dismissible>
                        {message}
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table size="sm" striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Plan</th>
                                <th>Subject</th>
                                <th>Identificación</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((data, index) => (
                                <tr key={data.id}>
                                    <td>{index + 1}</td>
                                    <td>{data?.plan?.name}</td>
                                    <td>{data?.member?.subject}</td>
                                    <td>{data?.member?.documentNumber}</td>
                                    <td>{data?.member?.name}</td>
                                    <td>{data?.member?.lastName}</td>
                                    <td>{data?.member?.email}</td>
                                    <td>{data?.member?.phone}</td>
                                    <td>{data?.status}</td>
                                    <td>
                                        <Button variant="secondary" size="sm" onClick={() => handleEdit(data)}>
                                            <i className="bi bi-pencil-square"></i> Editar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ListSubscriptions;