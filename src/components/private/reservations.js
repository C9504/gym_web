import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { Button, Container, Form, Offcanvas } from "react-bootstrap";
import { apiRequest } from "../../services/config";
import { toast } from "react-toastify";

const Reservations = () => {

    const { keycloak, initialized } = useKeycloak();
    const [reservations, setReservations] = useState([]);

    const [createReservation, setCreateReservation] = useState({
        gymClass: {
            id: ''
        }
    });
  const [create, setCreate] = useState(false);
  const handleCloseCreate = () => setCreate(false);
  const handleShowCreate = () => setCreate(true);
  const [creating, setCreating] = useState(false);

  const [updateCustomer, setUpdateCustomer] = useState({});
  const [update, setUpdate] = useState(false);
  const handleCloseUpdate = () => setUpdate(false);
  const handleShowUpdate = () => setUpdate(true);
  const [updating, setUpdating] = useState(false);

    useEffect(() => {
        getReservations();
    }, []);

    const getReservations = async () => {
        await axios.get(`${apiRequest()}/reservations/me`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            setReservations(res.data);
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    const saveReservation = async (event) => {
        event.preventDefault();
        setCreating(true);
        const toastId = toast.loading("Guardando...", { hideProgressBar: false, position: "bottom-center" });
        await axios.post(`${apiRequest()}/reservations`, createReservation, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
          if (res.status === 200) {
            setCreateReservation({});
            event.target.reset();
            handleCloseCreate();
            toast.update(toastId, { render: "Operación realizada con exito", hideProgressBar: true, type: "success", isLoading: false, autoClose: 5000, closeOnClick: true });
            getReservations();
            setCreating(false);
          }
        }).catch((_err) => {
          setCreating(false);
          toast.update(toastId, { render: "Error: por favor revisa que los datos sean correctos e intenta de nuevo", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true });
        });
      }

    return (
        <Container>
            <h1>Reservas</h1>
            <Offcanvas placement="end" show={create} onHide={handleCloseCreate} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Nuevo cliente</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    ¡Bienvenido al proceso de registro de clientes!
                    <br />
                    El registro de clientes es el primer paso para aprovechar al máximo todas las funcionalidades que ofrecemos. Por favor, completa el formulario a continuación con la información necesaria para crear tu cuenta y comenzar a gestionar tus clientes de manera eficiente. Recuerda proporcionar datos precisos y actualizados para garantizar una experiencia óptima. Una vez que completes el registro, podrás acceder a tu cuenta y empezar a explorar todas las características diseñadas para simplificar la gestión de clientes.
                    <br />
                    <br />
                    <Form onSubmit={saveReservation}>
                        <Form.Label>Razon social</Form.Label>
                        <Form.Control className="mb-3" size="sm" type="text" defaultValue={createReservation.corporateName} onChange={(e) => setCreateReservation({ ...createReservation, corporateName: e.target.value })} required />
                        <Form.Label>Representante</Form.Label>
                        <Form.Control className="mb-3" size="sm" type="text" defaultValue={createReservation.owner} onChange={(e) => setCreateReservation({ ...createReservation, owner: e.target.value })} required />
                        <Form.Label>Correo</Form.Label>
                        <Form.Control className="mb-3" size="sm" type="email" defaultValue={createReservation.email} onChange={(e) => setCreateReservation({ ...createReservation, email: e.target.value })} required />
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control className="mb-3" size="sm" type="text" defaultValue={createReservation.phone} onChange={(e) => setCreateReservation({ ...createReservation, phone: e.target.value })} required />
                        <Form.Label>Direccíon</Form.Label>
                        <Form.Control className="mb-3" size="sm" type="text" defaultValue={createReservation.address} onChange={(e) => setCreateReservation({ ...createReservation, address: e.target.value })} required />
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control className="mb-3" size="sm" type="text" defaultValue={createReservation.city} onChange={(e) => setCreateReservation({ ...createReservation, city: e.target.value })} required />
                        <Form.Label>Estado</Form.Label>
                        <Form.Switch checked={createReservation.status || false} value={createReservation.status} onChange={(e) => setCreateReservation({ ...createReservation, status: e.target.checked })} />
                        <br />
                        <Button variant="success" size="sm" type="submit" disabled={creating}>{creating ? 'Guardando...' : 'Guardar'}</Button>{' '}
                        <Button variant="secondary" size="sm" onClick={handleCloseCreate}>Cancelar</Button>{' '}
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};

export default Reservations;