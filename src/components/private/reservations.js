import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { Button, Container, Form, Offcanvas } from "react-bootstrap";
import { apiRequest } from "../../services/config";
import { toast } from "react-toastify";

const Reservations = () => {

    const { keycloak, initialized } = useKeycloak();
    const [reservations, setReservations] = useState([]);

    const [createCustomer, setCreateCustomer] = useState({});
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
        await axios.get(`${apiRequest()}/reservations`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
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
        await axios.post(`${apiRequest()}/reservations`, createCustomer, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: true }).then((res) => {
          if (res.status === 200) {
            setCreateCustomer({});
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
                        <Form.Control className="mb-3" size="sm" type="text" defaultValue={createCustomer.corporateName} onChange={(e) => setCreateCustomer({ ...createCustomer, corporateName: e.target.value })} required />
                        <Form.Label>Representante</Form.Label>
                        <Form.Control className="mb-3" size="sm" type="text" defaultValue={createCustomer.owner} onChange={(e) => setCreateCustomer({ ...createCustomer, owner: e.target.value })} required />
                        <Form.Label>Correo</Form.Label>
                        <Form.Control className="mb-3" size="sm" type="email" defaultValue={createCustomer.email} onChange={(e) => setCreateCustomer({ ...createCustomer, email: e.target.value })} required />
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control className="mb-3" size="sm" type="text" defaultValue={createCustomer.phone} onChange={(e) => setCreateCustomer({ ...createCustomer, phone: e.target.value })} required />
                        <Form.Label>Direccíon</Form.Label>
                        <Form.Control className="mb-3" size="sm" type="text" defaultValue={createCustomer.address} onChange={(e) => setCreateCustomer({ ...createCustomer, address: e.target.value })} required />
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control className="mb-3" size="sm" type="text" defaultValue={createCustomer.city} onChange={(e) => setCreateCustomer({ ...createCustomer, city: e.target.value })} required />
                        <Form.Label>Estado</Form.Label>
                        <Form.Switch checked={createCustomer.status || false} value={createCustomer.status} onChange={(e) => setCreateCustomer({ ...createCustomer, status: e.target.checked })} />
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