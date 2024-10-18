import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { apiRequest } from "../../services/config";
import moment from "moment-timezone";

const Profile = () => {

    const { keycloak, initialized } = useKeycloak();
    const [profile, setProfile] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [exists, setExists] = useState(false);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        await axios.get(`${apiRequest()}/members/me`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            setProfile(res.data);
            console.log(res.data);
            if (res.status === 200) {
                setExists(true);
            }
            console.log(res.status);
        }).catch((error) => {
            console.log(error?.response?.status);
        });
    };

    const updateProfile = async (event) => {
        event.preventDefault();
        setUpdating(true);
        const toastId = toast.loading("Actualizando...", { hideProgressBar: false, position: "bottom-center" });
        await axios.post(`${apiRequest()}/members`, profile, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            if (res.status === 200) {
                event.target.reset();
                setUpdating(false);
                setExists(true);
                toast.update(toastId, { render: "Datos actualizados correctamente", hideProgressBar: true, type: "success", isLoading: false, autoClose: 5000, closeOnClick: true });

            }
            getProfile();
        }).catch((_err) => {
            setUpdating(false);
            toast.update(toastId, { render: "Error: por favor revisa que los datos sean correctos e intenta de nuevo", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true });
        });
    };

    const updateExistingProfile = async (event) => {
        event.preventDefault();
        setUpdating(true);
        const toastId = toast.loading("Actualizando...", { hideProgressBar: false, position: "bottom-center" });
        await axios.put(`${apiRequest()}/members/${profile?.id}`, profile, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            if (res.status === 200) {
                setUpdating(false);
                setExists(true);
                toast.update(toastId, { render: "Operación realizada con exito", hideProgressBar: true, type: "success", isLoading: false, autoClose: 5000, closeOnClick: true });
            }
            getProfile();
        }).catch((_err) => {
            setUpdating(false);
            toast.update(toastId, { render: "Error: por favor revisa que los datos sean correctos e intenta de nuevo", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true });
        });
    };

    return (
        <Container>
            <Form onSubmit={exists ? updateExistingProfile : updateProfile}>
                <div className="text-center">
                    <img className="mb-4" src="logoNegrdo.png" alt="" width="100" height="100" />
                    <h1 className="h3 mb-3 fw-normal">Mi perfil</h1>
                    <p style={{ fontSize: '12px' }}>Por favor, complete los siguientes datos y verifique que los datos sean correctos</p>
                </div>
                <h3 className="mb-3">Datos de contacto</h3>
                <Row className="mb-3">
                    <Col>
                        <Form.Label><span className="text-danger">*</span> Identificación</Form.Label>
                        <Form.Control type="text" pattern="[0-9]*" size="sm" defaultValue={profile?.documentNumber} onChange={(e) => setProfile({ ...profile, documentNumber: e.target.value })} minLength={8} placeholder="Identificación" disabled={updating} required />
                    </Col>
                    <Col>
                        <Form.Label><span className="text-danger">*</span> Nombre</Form.Label>
                        <Form.Control type="text" size="sm" defaultValue={profile?.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Nombre" disabled={updating} required />
                    </Col>
                    <Col>
                        <Form.Label><span className="text-danger">*</span> Apellidos</Form.Label>
                        <Form.Control type="text" size="sm" defaultValue={profile?.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} placeholder="Apellidos" disabled={updating} required />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label><span className="text-danger">*</span> Email</Form.Label>
                        <Form.Control type="email" size="sm" defaultValue={profile?.email ? profile?.email : keycloak?.profile?.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="Email" readOnly disabled={updating} required />
                    </Col>
                    <Col>
                        <Form.Label><span className="text-danger">*</span> Genero</Form.Label>
                        <Form.Select size="sm" value={profile?.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} disabled={updating} required >
                            <option value="">Seleccione</option>
                            <option value="HOMBRE">HOMBRE</option>
                            <option value="MUJER">MUJER</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label><span className="text-danger">*</span> Telefono</Form.Label>
                        <Form.Control minLength={8} maxLength={13} type="text" size="sm" defaultValue={profile?.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="Telefono" disabled={updating} required />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label><span className="text-danger">*</span> Dirección</Form.Label>
                        <Form.Control type="text" size="sm" value={profile?.address || ''} onChange={(e) => setProfile({ ...profile, address: e.target.value })} placeholder="Dirección" disabled={updating} required />
                    </Col>
                    <Col>
                        <Form.Label><span className="text-danger">*</span> Fecha de cumpleaños</Form.Label>
                        <Form.Control type="date" size="sm" value={moment(profile?.birthDate).tz('America/Bogota').format('YYYY-MM-DD')} onChange={(e) => setProfile({ ...profile, birthDate: moment(e.target.value).tz('America/Bogota').toDate() })} disabled={updating} required />
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
                <Alert variant="warning" show={exists} onClose={() => setExists(false)} dismissible>
                    Debes completar todos los datos, para que tu cuenta quede activa.
                </Alert>
                {!updated && (
                    <Button variant="primary" className="w-100 py-2 btn-sm" type="submit" disabled={updating}>{updating ? 'Actualizando, por favor espere...' : 'Guardar cambios'}</Button>
                )}
            </Form>
        </Container>
    );
};

export default Profile;