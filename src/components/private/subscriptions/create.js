import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import moment from "moment-timezone";
import { apiRequest } from "../../../services/config";
import Select from "react-select";
import { defaultStyeSelect } from "../../customs/select";


const CreateMembers = ({ setNew, setSaved, setFinished, members, plans, setMessage, setType }) => {

    const { keycloak, initialized } = useKeycloak();
    const [newData, setNewData] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        console.log(initialized);
    }, []);

    const saveData = async (event) => {
        event.preventDefault();
        console.log(newData);
        setSaving(true);
        await axios.post(`${apiRequest()}/subscriptions`, newData, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            event.target.reset();
            setSaving(false);
            setSaved(true);
            setNew(false);
            setFinished(true);
            setType("success");
            setMessage("Suscrípción guardada correctamente");
        }).catch((err) => {
            setType("danger");
            setMessage(err?.response?.data);
            setSaving(false);
            setSaved(true);
        });
    };

    const handleChange = (selectedOption) => {
        setNewData({...newData, member: selectedOption}); // selectedOption puede ser null
        console.log(selectedOption); // Imprime null cuando se limpia la selección
      };

    return (
        <Container className="mb-3">
            <Form onSubmit={saveData}>
                <h3 className="mb-3">Agregar nueva suscripción</h3>
                <Row className="mb-3">
                    <Col xs="12" md="12">
                        <Form.Label><span className="text-danger">*</span> Member</Form.Label>
                        <Select
                            className="basic-select"
                            classNamePrefix="select"
                            styles={defaultStyeSelect}
                            defaultValue={newData.member || members[0]}
                            onChange={(e) => setNewData({ ...newData, member: { id: e?.value?.id } })}
                            isDisabled={saving}
                            // isLoading={isLoading}
                            isClearable={true}
                            // isRtl={isRtl}
                            isSearchable={true}
                            name="color"
                            options={members}
                            required
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs="12" md="12">
                        <Form.Label><span className="text-danger">*</span> Plan</Form.Label>
                        <Select
                            className="basic-select"
                            classNamePrefix="select"
                            styles={defaultStyeSelect}
                            defaultValue={newData.plan || plans[0]}
                            onChange={(e) => setNewData({ ...newData, plan: { id: e?.value?.id } })}
                            isDisabled={saving}
                            // isLoading={isLoading}
                            isClearable={true}
                            // isRtl={isRtl}
                            isSearchable={true}
                            name="color"                            
                            options={plans}
                            required
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Estado</Form.Label>
                        <Form.Select size="sm" value={newData?.status} onChange={(e) => setNewData({ ...newData, status: e.target.value })} disabled={saving} required>
                            <option value="">Seleccione</option>
                            <option value="ACTIVA">ACTIVA</option>
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="CANCELADA">CANCELADA</option>
                            <option value="SUSPENDIDA">SUSPENDIDA</option>
                            <option value="EXPIRADA">EXPIRADA</option>
                        </Form.Select>
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Inicio</Form.Label>
                        <Form.Control type="datetime-local" size="sm" value={moment(newData?.startDate).tz('America/Bogota').format('YYYY-MM-DD HH:mm')} onChange={(e) => setNewData({ ...newData, startDate: moment(e.target.value).tz('America/Bogota').format('YYYY-MM-DDTHH:mm') })} disabled={saving} required />
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Finalización</Form.Label>
                        <Form.Control type="datetime-local" size="sm" value={moment(newData?.endDate).tz('America/Bogota').format('YYYY-MM-DD HH:mm')} onChange={(e) => setNewData({ ...newData, endDate: moment(e.target.value).tz('America/Bogota').format('YYYY-MM-DDTHH:mm') })} disabled={saving} required />
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

export default CreateMembers;