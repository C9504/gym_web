import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import { apiRequest } from "../../../services/config";

const CreateTrainers = ({ setNewTrainer, setSaved, setFinished, setMessage }) => {

    const { keycloak, initialized } = useKeycloak();
    const [trainer, setTrainer] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        console.log(initialized);
    }, []);

    const saveTrainer = async (event) => {
        event.preventDefault();
        setSaving(true);
        const toastId = toast.loading("Guardando...", { hideProgressBar: false, position: "bottom-center" });
        await axios.post(`${apiRequest()}/trainers`, trainer, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            event.target.reset();
            setSaving(false);
            setSaved(true);
            setNewTrainer(false);
            setFinished(true);
            setMessage("Trainer guardado correctamente");
        }).catch((_err) => {
            setSaving(false);
            toast.update(toastId, { render: "Error: por favor revisa que los datos sean correctos e intenta de nuevo", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true });
        });
    };

    return (
        <Container>
            <Form onSubmit={saveTrainer}>
                <h3 className="mb-3">Datos de contacto</h3>
                <Row className="mb-3">
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Identificación</Form.Label>
                        <Form.Control type="text" pattern="[0-9]*" size="sm" defaultValue={trainer?.documentNumber} onChange={(e) => setTrainer({ ...trainer, documentNumber: e.target.value })} minLength={8} placeholder="Identificación" disabled={saving} required />
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Nombre</Form.Label>
                        <Form.Control type="text" size="sm" defaultValue={trainer?.name} onChange={(e) => setTrainer({ ...trainer, name: e.target.value })} placeholder="Nombre" disabled={saving} required />
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Apellidos</Form.Label>
                        <Form.Control type="text" size="sm" defaultValue={trainer?.lastName} onChange={(e) => setTrainer({ ...trainer, lastName: e.target.value })} placeholder="Apellidos" disabled={saving} required />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Email</Form.Label>
                        <Form.Control type="email" size="sm" defaultValue={trainer?.email} onChange={(e) => setTrainer({ ...trainer, email: e.target.value })} placeholder="Email" disabled={saving} required />
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Genero</Form.Label>
                        <Form.Select size="sm" value={trainer?.gender} onChange={(e) => setTrainer({ ...trainer, gender: e.target.value })} disabled={saving} required >
                            <option value="">Seleccione</option>
                            <option value="HOMBRE">HOMBRE</option>
                            <option value="MUJER">MUJER</option>
                        </Form.Select>
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Telefono</Form.Label>
                        <Form.Control minLength={8} maxLength={13} type="text" size="sm" defaultValue={trainer?.phone} onChange={(e) => setTrainer({ ...trainer, phone: e.target.value })} placeholder="Telefono" disabled={saving} required />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs="12" md="8">
                        <Form.Label><span className="text-danger">*</span> Dirección</Form.Label>
                        <Form.Control type="text" size="sm" value={trainer?.specialty || ''} onChange={(e) => setTrainer({ ...trainer, specialty: e.target.value })} placeholder="Dirección" disabled={saving} required />
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Fecha de cumpleaños</Form.Label>
                        <Form.Control type="date" size="sm" value={moment(trainer?.hireDate).tz('America/Bogota').format('YYYY-MM-DD')} onChange={(e) => setTrainer({ ...trainer, hireDate: moment(e.target.value).tz('America/Bogota').toDate() })} disabled={saving} required />
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