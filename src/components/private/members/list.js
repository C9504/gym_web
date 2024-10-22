import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import moment from "moment-timezone";
import { apiRequest } from "../../../services/config";
import CreateMembers from "./create";
import EditMember from "./edit";

const ListMembers = () => {

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
        await axios.get(`${apiRequest()}/members`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
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
                    <h1 className="mt-5 mb-3">Miembros</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="float-end align-self-center mb-3" variant="primary" size="sm" onClick={handleNew}>
                        {newData ? "Cancelar" : "Nuevo Miembro"}
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    {newData && (
                        <CreateMembers setNew={setNewData} setSaved={setSaved} setFinished={setFinished} setMessage={setMessage} setType={setType}/>
                    )}
                    {update && (
                        <EditMember setUpdate={setUpdate} setUpdated={setUpdated} setFinished={setFinished} data={data} setMessage={setMessage} setType={setType} />
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
                    <Table striped bordered hover responsive>
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
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ListMembers;