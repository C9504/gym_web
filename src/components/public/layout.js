import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import CustomNav from "./nav";

const Layout = () => {

    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        if (initialized && keycloak.authenticated) {
            keycloak.loadUserProfile().then((userProfile) => {
                console.log(userProfile)
            });
            console.log(keycloak.hasResourceRole('member'));
        }
    }, [initialized]);

    return (
        <>
            <CustomNav />
            <div className="gym-background-img"></div>
            <div className="gym-content">
                <Outlet />
            </div>
        </>
    );

}
export default Layout;