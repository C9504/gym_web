import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import moment from "moment-timezone";
import { apiRequest } from "../../../services/config";
import CreateTrainers from "./create";
import EditTrainer from "./edit";

const ListTrainers = () => {

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
        if(finished) {
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
        await axios.get(`${apiRequest()}/trainers`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            setList(res.data);
            console.log(initialized);
        }).catch((error) => {
            console.log(error?.response?.status);
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="mt-5 mb-3">Trainers</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="float-end align-self-center mb-3" variant="primary" size="sm" onClick={handleNew}>
                        {newData ? "Cancelar" : "Nuevo Entrenador"}
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    {newData && (
                        <CreateTrainers setNew={setNewData} setSaved={setSaved} setFinished={setFinished} setMessage={setMessage} setType={setType} />
                    )}
                    {update && (
                        <EditTrainer setUpdate={setUpdate} setUpdated={setUpdated} setFinished={setFinished} data={data} setMessage={setMessage} setType={setType} />
                    )}
                    <Alert variant={type} show={saved} onClose={() => setSaved(!saved)} dismissible>
                        {message}
                    </Alert>
                    <Alert variant={type} show={updated} onClose={() => setUpdated(!updated)} dismissible>
                        {message}
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Subject</th>
                                <th>Identificación</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Genero</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Especialidad</th>
                                <th>Fecha de contratación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((trainer, index) => (
                                <tr key={trainer.id}>
                                    <td>{index + 1}</td>
                                    <td>{trainer?.subject}</td>
                                    <td>{trainer?.documentNumber}</td>
                                    <td>{trainer?.name}</td>
                                    <td>{trainer?.lastName}</td>
                                    <td>{trainer?.gender}</td>
                                    <td>{trainer?.email}</td>
                                    <td>{trainer?.phone}</td>
                                    <td>{trainer?.specialty}</td>
                                    <td>{moment(trainer?.hireDate).tz('America/Bogota').format('D [de] MMMM [de] YYYY')}</td>
                                    <td>
                                        <Button variant="warning" size="sm" onClick={() => handleEdit(trainer)}>
                                            Editar
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

export default ListTrainers;