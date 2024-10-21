import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import moment from "moment-timezone";
import { apiRequest } from "../../../services/config";

const EditTrainer = ({ setUpdateTrainer, setUpdated, setFinished, trainer, setMessage }) => {

    const { keycloak, initialized } = useKeycloak();
    const [request, setRequest] = useState(trainer);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (trainer) {
            setRequest(trainer);
        }
        console.log(initialized);
    }, [trainer]);

    const saveTrainer = async (event) => {
        event.preventDefault();
        setUpdating(true);
        await axios.put(`${apiRequest()}/trainers/${request?.id}`, request, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            event.target.reset();
            setMessage("Trainer actualizado correctamente");
            setUpdated(true);
            setUpdating(false);
            setUpdateTrainer(false);
            setFinished(true);
        }).catch((_err) => {
            setMessage("Error: por favor revisa que los datos sean correctos e intenta de nuevo");
            setUpdating(false);
        });
    };

    return (
        <Container>
            <Form onSubmit={saveTrainer}>
                <h3 className="mb-3">Datos de contacto</h3>
                <Row className="mb-3">
                    {/* <Col>
                        <Form.Label><span className="text-danger">*</span> Identificación</Form.Label>
                        <Form.Control type="text" pattern="[0-9]*" size="sm" value={request?.documentNumber || ''} onChange={(e) => setRequest({ ...request, documentNumber: e.target.value })} minLength={8} placeholder="Identificación" disabled={saving} required />
                    </Col> */}
                    <Col xs="12" md="6">
                        <Form.Label><span className="text-danger">*</span> Nombre</Form.Label>
                        <Form.Control type="text" size="sm" value={request?.name || ''} onChange={(e) => setRequest({ ...request, name: e.target.value })} placeholder="Nombre" disabled={updating} required />
                    </Col>
                    <Col xs="12" md="6">
                        <Form.Label><span className="text-danger">*</span> Apellidos</Form.Label>
                        <Form.Control type="text" size="sm" value={request?.lastName || ''} onChange={(e) => setRequest({ ...request, lastName: e.target.value })} placeholder="Apellidos" disabled={updating} required />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs="12" md="6">
                        <Form.Label><span className="text-danger">*</span> Email</Form.Label>
                        <Form.Control type="email" size="sm" value={request?.email || ''} onChange={(e) => setRequest({ ...trainer, email: e.target.value })} placeholder="Email" disabled={updating} required />
                    </Col>
                    {/* <Col>
                        <Form.Label><span className="text-danger">*</span> Genero</Form.Label>
                        <Form.Select size="sm" value={request?.gender} onChange={(e) => setRequest({ ...request, gender: e.target.value })} disabled={saving} required >
                            <option value="">Seleccione</option>
                            <option value="HOMBRE">HOMBRE</option>
                            <option value="MUJER">MUJER</option>
                        </Form.Select>
                    </Col> */}
                    <Col xs="12" md="6">
                        <Form.Label><span className="text-danger">*</span> Telefono</Form.Label>
                        <Form.Control minLength={8} maxLength={13} type="text" size="sm" value={request?.phone || ''} onChange={(e) => setRequest({ ...request, phone: e.target.value })} placeholder="Telefono" disabled={updating} required />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs="12" md="6">
                        <Form.Label><span className="text-danger">*</span> Dirección</Form.Label>
                        <Form.Control type="text" size="sm" value={request?.specialty || ''} onChange={(e) => setRequest({ ...request, specialty: e.target.value })} placeholder="Dirección" disabled={updating} required />
                    </Col>
                    <Col xs="12" md="6">
                        <Form.Label><span className="text-danger">*</span> Fecha de contratación</Form.Label>
                        <Form.Control type="date" size="sm" value={moment(request?.hireDate).tz('America/Bogota').format('YYYY-MM-DD')} onChange={(e) => setRequest({ ...request, hireDate: moment(e.target.value).tz('America/Bogota').toDate() })} disabled={updating} required />
                    </Col>
                </Row>
                {/* <Row className="mb-3">
                        <Col>
                            <Form.Label><span className="text-danger">*</span> Logo</Form.Label>
                            <Form.Control size="sm" type="file" accept="image/*" onChange={handleImageChange} className="mb-3" disabled={updating} required />
                        </Col>
                    </Row> */}
                {/* {imagePreview && (
                    <Row className="mb-3">
                        <img src={imagePreview} alt="Vista previa de la imagen" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                    </Row>
                )} */}
                <Button variant="primary" className="w-100 py-2 btn-sm" type="submit" disabled={updating}>{updating ? 'Guardando..., por favor espere...' : 'Guardar'}</Button>
            </Form>
        </Container>
    );
};

export default EditTrainer;