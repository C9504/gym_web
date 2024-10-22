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
    const [allTrainers, setAllTrainers] = useState([]);
    const [newTrainer, setNewTrainer] = useState(false);
    const [updateTrainer, setUpdateTrainer] = useState(false);
    const [trainer, setTrainer] = useState({});
    const [saved, setSaved] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [message, setMessage] = useState("Message here");
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        getAllTrainers();
    }, []);

    useEffect(() => {
        if(finished) {
            getAllTrainers();
        }
    }, [finished]);

    const handleNewTrainer = () => { 
        setNewTrainer(!newTrainer); 
        setUpdateTrainer(false); 
        setUpdated(false); 
        setSaved(false);
    };

    const handleEditTrainer = (trainer) => {
        setNewTrainer(false);
        setTrainer(trainer);
        setUpdated(false);
        setUpdateTrainer(!updateTrainer);
    };

    const getAllTrainers = async () => {
        await axios.get(`${apiRequest()}/trainers`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            setAllTrainers(res.data);
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
                    <Button className="float-end align-self-center mb-3" variant="primary" size="sm" onClick={handleNewTrainer}>
                        {newTrainer ? "Cancelar" : "Nuevo Entrenador"}
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    {newTrainer && (
                        <CreateTrainers setNewTrainer={setNewTrainer} setSaved={setSaved} setFinished={setFinished} setMessage={setMessage} />
                    )}
                    {updateTrainer && (
                        <EditTrainer setUpdateTrainer={setUpdateTrainer} setUpdated={setUpdated} setFinished={setFinished} trainer={trainer} setMessage={setMessage} />
                    )}
                    <Alert variant="success" show={saved} onClose={() => setSaved(!saved)} dismissible>
                        {message}
                    </Alert>
                    <Alert variant="success" show={updated} onClose={() => setUpdated(!updated)} dismissible>
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
                                <th>Plan</th>
                                <th>Duración</th>
                                <th>Inicio</th>
                                <th>Finalización</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTrainers.map((trainer, index) => (
                                <tr key={trainer.id}>
                                    <td>{index + 1}</td>
                                    <td>{trainer?.name}</td>
                                    <td>{trainer?.lastName}</td>
                                    <td>{moment(trainer.startDate).tz('America/Bogota').format('D [de] MMMM [de] YYYY [a las] HH:mm A')}</td>
                                    <td>{moment(trainer?.endDate).tz('America/Bogota').format('D [de] MMMM [de] YYYY [a las] HH:mm A')}</td>
                                    <td>{trainer?.status}</td>
                                    <td>
                                        <Button variant="warning" size="sm" onClick={() => handleEditTrainer(trainer)}>
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