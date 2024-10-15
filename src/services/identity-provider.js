import Keycloak from "keycloak-js";
import { getClient, getIdentity, getRealm } from "./config";
const keycloak = new Keycloak({
    "url": `${getIdentity()}`, // SERVER APLICATION
    "realm": `${getRealm()}`,
    "clientId": `${getClient()}`
});

export default keycloak;