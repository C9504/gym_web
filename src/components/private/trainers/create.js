import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import moment from "moment-timezone";
import { apiRequest } from "../../../services/config";

const CreateTrainers = ({ setNew, setSaved, setFinished, setMessage, setType }) => {

    const { keycloak, initialized } = useKeycloak();
    const [newData, setTrainer] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        console.log(initialized);
    }, []);

    const saveData = async (event) => {
        event.preventDefault();
        setSaving(true);
        await axios.post(`${apiRequest()}/trainers/register`, newData, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            event.target.reset();
            setSaving(false);
            setSaved(true);
            setNew(false);
            setFinished(true);
            setType("success");
            setMessage("Trainer guardado correctamente");
        }).catch((err) => {
            setType("danger");
            setMessage(err?.response?.data);
            setSaving(false);
            setSaved(true);
        });
    };

    return (
        <Container>
            <Form onSubmit={saveData}>
                <h3 className="mb-3">Datos de contacto</h3>
                <Row className="mb-3">
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Identificación</Form.Label>
                        <Form.Control type="text" pattern="[0-9]*" size="sm" defaultValue={newData?.documentNumber} onChange={(e) => setTrainer({ ...newData, documentNumber: e.target.value })} minLength={8} placeholder="Identificación" disabled={saving} required />
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Nombre</Form.Label>
                        <Form.Control type="text" size="sm" defaultValue={newData?.name} onChange={(e) => setTrainer({ ...newData, name: e.target.value })} placeholder="Nombre" disabled={saving} required />
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Apellidos</Form.Label>
                        <Form.Control type="text" size="sm" defaultValue={newData?.lastName} onChange={(e) => setTrainer({ ...newData, lastName: e.target.value })} placeholder="Apellidos" disabled={saving} required />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Email</Form.Label>
                        <Form.Control type="email" size="sm" defaultValue={newData?.email} onChange={(e) => setTrainer({ ...newData, email: e.target.value })} placeholder="Email" disabled={saving} required />
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Genero</Form.Label>
                        <Form.Select size="sm" value={newData?.gender} onChange={(e) => setTrainer({ ...newData, gender: e.target.value })} disabled={saving} required >
                            <option value="">Seleccione</option>
                            <option value="HOMBRE">HOMBRE</option>
                            <option value="MUJER">MUJER</option>
                        </Form.Select>
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Telefono</Form.Label>
                        <Form.Control minLength={8} maxLength={13} type="text" size="sm" defaultValue={newData?.phone} onChange={(e) => setTrainer({ ...newData, phone: e.target.value })} placeholder="Telefono" disabled={saving} required />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs="12" md="8">
                        <Form.Label><span className="text-danger">*</span> Especialidad</Form.Label>
                        <Form.Control type="text" size="sm" value={newData?.specialty || ''} onChange={(e) => setTrainer({ ...newData, specialty: e.target.value })} placeholder="Especialidad" disabled={saving} required />
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Fecha de contratación</Form.Label>
                        <Form.Control type="date" size="sm" value={moment(newData?.hireDate).tz('America/Bogota').format('YYYY-MM-DD')} onChange={(e) => setTrainer({ ...newData, hireDate: moment(e.target.value).tz('America/Bogota').toDate() })} disabled={saving} required />
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
                <Button variant="primary" className="w-100 py-2 btn-sm" type="submit" disabled={saving}>{saving ? 'Guardando..., por favor espere...' : 'Guardar'}</Button>
            </Form>
        </Container>
    );
};

export default CreateTrainers;