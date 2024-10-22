import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { apiRequest } from "../../services/config";
import moment from "moment-timezone";
import EditMember from "./members/edit";
import EditTrainer from "./trainers/edit";

const Profile = () => {

    const { keycloak, initialized } = useKeycloak();
    const [profile, setProfile] = useState([]);

    const [update, setUpdate] = useState(true);
    const [updated, setUpdated] = useState(false);
    const [message, setMessage] = useState("Message here");
    const [type, setType] = useState("success");
    const [finished, setFinished] = useState(false);
    let role = "members";

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (finished) {
            getProfile();
        }
    }, [finished]);

    const getProfile = async () => {
        if (keycloak.hasResourceRole('trainer')) {
            role = "trainers";
        }
        await axios.get(`${apiRequest()}/${role}/me`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: false }).then((res) => {
            setProfile(res.data);
            console.log(res.data);
        }).catch((error) => {
            console.log(error?.response?.status);
        });
    };

    return (
        <Container>
            {keycloak.hasResourceRole('member') && (
                <Row className="mb-3">
                    <Col>
                        <EditMember setUpdate={setUpdate} setUpdated={setUpdated} setFinished={setFinished} data={profile} setMessage={setMessage} setType={setType} />
                        <Alert className="mt-3" variant="success" show={updated} onClose={() => setUpdated(!updated)} dismissible>
                            {message}
                        </Alert>
                    </Col>
                </Row>
            )}
            {keycloak.hasResourceRole('trainer') && (
                <Row className="mb-3">
                    <Col>
                        <EditTrainer setUpdate={setUpdate} setUpdated={setUpdated} setFinished={setFinished} data={profile} setMessage={setMessage} setType={setType} />
                        <Alert className="mt-3" variant={type} show={updated} onClose={() => setUpdated(!updated)} dismissible>
                            {message}
                        </Alert>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Profile;