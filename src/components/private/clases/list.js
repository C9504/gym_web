import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { apiRequest } from "../../../services/config";
import CreateClass from "./create";
import EditClass from "./edit";

const ListClases = () => {

    const { keycloak, initialized } = useKeycloak();
    const [list, setList] = useState([]);
    const [newData, setNewData] = useState(false);
    const [update, setUpdate] = useState(false);
    const [data, setData] = useState({});
    const [saved, setSaved] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [message, setMessage] = useState("Message here");
    const [type, setType] = useState("success");
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        getAll();
    }, []);

    useEffect(() => {
        if (finished) {
            getAll();
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
        await axios.get(`${apiRequest()}/gym-classes`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            setList(res.data);
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
                    <h1 className="mt-3 mb-3">Clases</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="float-end align-self-center mb-3" variant="primary" size="sm" onClick={handleNew}>
                        {newData ? "Cancelar" : "Nueva Clase"}
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    {newData && (
                        <CreateClass setNew={setNewData} setSaved={setSaved} setFinished={setFinished} setMessage={setMessage} setType={setType} />
                    )}
                    {update && (
                        <EditClass setUpdate={setUpdate} setUpdated={setUpdated} setFinished={setFinished} data={data} setMessage={setMessage} setType={setType} />
                    )}
                    <Alert variant={type} show={saved} onClose={() => setSaved(!saved)} dismissible>
                        {message}
                    </Alert>
                    <Alert variant="success" show={updated} onClose={() => setUpdated(!updated)} dismissible>
                        {message}
                    </Alert>
                </Col>
            </Row>
            <Row xs={1} md={4} className="g-4">
                {list.map((data, _) => (
                    <Col key={data?.id}>
                        <Card>
                            <Card.Img variant="top" src="/assets/img/yoga.jpg" />
                            <Card.Body>
                                <Card.Title>{data?.name}</Card.Title>
                                <Card.Text>
                                    {data?.description}
                                </Card.Text>
                                <Card.Text>
                                    <Button variant="secondary" size="sm" onClick={() => handleEdit(data)}>
                                        <i className="bi bi-pencil-square"></i> Editar
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col>
                    {/* <Table size="sm" striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Subject</th>
                                <th>Identificación</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Fecha de Registro</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((data, index) => (
                                <tr key={data.id}>
                                    <td>{index + 1}</td>
                                    <td>{data?.subject}</td>
                                    <td>{data?.documentNumber}</td>
                                    <td>{data?.name}</td>
                                    <td>{data?.lastName}</td>
                                    <td>{data?.email}</td>
                                    <td>{data?.phone}</td>
                                    <td>{moment(data?.joinDate).tz('America/Bogota').format('D [de] MMMM [de] YYYY')}</td>
                                    <td>{data?.status}</td>
                                    <td>
                                        <Button variant="warning" size="sm" onClick={() => handleEdit(data)}>
                                            Editar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table> */}
                </Col>
            </Row>
        </Container>
    );
};

export default ListClases;