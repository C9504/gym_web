import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ role }) => {
    const { keycloak } = useKeycloak();
  
    if (!keycloak.authenticated) {
      // Si el usuario no está autenticado, redirigir al inicio
      return <Navigate to="/" />;
    }
  
    if (role && !keycloak.hasResourceRole(role)) {
      // Si se especifica un rol y el usuario no lo tiene, redirigir al inicio
      return <Navigate to="/" />;
    }
  
    // Si está autenticado y tiene el rol (si aplica), renderizar las rutas hijas
    return <Outlet />;
  };
  
  export default ProtectedRoutes;