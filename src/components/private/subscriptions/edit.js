import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import moment from "moment-timezone";
import { apiRequest } from "../../../services/config";
import Select from "react-select";
import { defaultStyeSelect } from "../../customs/select";

const EditMember = ({ setUpdate, setUpdated, setFinished, data, plans, members, setMessage, setType }) => {

    const { keycloak, initialized } = useKeycloak();
    const [request, setRequest] = useState(data);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (data) {
            setRequest(data);
        }
        console.log(initialized);
    }, [data]);

    const update = async (event) => {
        event.preventDefault();
        setUpdating(true);
        await axios.put(`${apiRequest()}/subscriptions/${request?.id}`, request, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            event.target.reset();
            setType("success");
            setMessage("Subscripción actualizado correctamente");
            setUpdated(true);
            setUpdating(false);
            setUpdate(false);
            setFinished(true);
        }).catch((err) => {
            setUpdated(true);
            setType("danger");
            setMessage(err?.response?.data);
            setUpdating(false);
        });
    };

    return (
        <Container>
            <Form onSubmit={update}>
                <h3 className="mb-3">Editar suscripción</h3>
                <Row className="mb-3">
                    <Col xs="12" md="12">
                        <Form.Label><span className="text-danger">*</span> Member</Form.Label>
                        <Select
                            className="basic-select"
                            classNamePrefix="select"
                            styles={defaultStyeSelect}
                            value={members.find((m) => m.value?.id === request?.member?.id) || members[0]}
                            onChange={(e) => { setRequest({ ...request, member: e.value }); console.log(e.value); }}
                            // isDisabled={isDisabled}
                            // isLoading={isLoading}
                            isClearable={false}
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
                            value={plans.find((m) => m.value?.id === request?.plan?.id) || plans[0]}
                            onChange={(e) => setRequest({ ...request, plan: e.value })}
                            // isDisabled={isDisabled}
                            // isLoading={isLoading}
                            isClearable={false}
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
                        <Form.Select size="sm" value={request?.status} onChange={(e) => setRequest({ ...request, status: e.target.value })} disabled={updating} required>
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
                        <Form.Control type="datetime-local" size="sm" value={moment(request?.startDate).tz('America/Bogota').format('YYYY-MM-DD HH:mm')} onChange={(e) => setRequest({ ...request, startDate: moment(e.target.value).tz('America/Bogota').format('YYYY-MM-DDTHH:mm') })} disabled={updating} required />
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Label><span className="text-danger">*</span> Finalización</Form.Label>
                        <Form.Control type="datetime-local" size="sm" value={moment(request?.endDate).tz('America/Bogota').format('YYYY-MM-DD HH:mm')} onChange={(e) => setRequest({ ...request, endDate: moment(e.target.value).tz('America/Bogota').format('YYYY-MM-DDTHH:mm') })} disabled={updating} required />
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

export default EditMember;