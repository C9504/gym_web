import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/public/layout";
import keycloak from "./services/identity-provider";
import Welcome from "./components/public/welcome";
import Progress from "./components/private/progress";
import Contact from "./components/public/contact";
import Classes from "./components/public/classes";
import Trainers from "./components/public/trainers";
import Reservations from "./components/private/reservations";
import About from "./components/public/about";
import Subscriptions from "./components/private/subscriptions";
import Profile from "./components/private/profile";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import Register from "./components/public/register";
import ProtectedRoutes from "./services/middleware";

function Main() {

  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized) {
      // Detectar la caducidad del token
      keycloak.onTokenExpired = () => {
        console.log('Token ha expirado');
        // Intenta renovar el token automáticamente
        keycloak.updateToken(30).then(refreshed => {
          if (!refreshed) {
            // Si no se puede renovar el token, redirige al login
            console.log('Token no pudo ser renovado, redirigiendo al inicio de sesión');
            keycloak.logout(); // Redirige al inicio de sesión de Keycloak
          }
        }).catch(() => {
          // Si ocurre un error, también redirige al login
          console.error('Error al intentar renovar el token');
          keycloak.logout();
        });
      };

      // Manejar cierre de sesión (Logout)
      keycloak.onAuthLogout = () => {
        console.log('Cierre de sesión detectado');
        // Redirigir al inicio de sesión
        navigate('/'); // Ruta de la página de inicio de sesión en tu app
      };
    }
  }, [keycloak, initialized, navigate]);

  if (!initialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '800px', alignItems: 'center' }}>
        <h2 style={{ textAlign: 'center' }}>
          <div className="spinner-border text-primary"></div>{" "}
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/trainers' element={<Trainers />} />
        <Route path='/classes' element={<Classes />} />
        <Route path='/register' element={<Register />} />
         {/* Agrupando las rutas protegidas para miembros */}
        <Route element={<ProtectedRoutes role='member' />}>
          <Route path='/subscriptions' element={<Subscriptions />} />
          <Route path='/progress' element={<Progress />} />
          <Route path='/reservations' element={<Reservations />} />
        </Route>

        {/* Agrupando las rutas para cualquier usuario autenticado */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      {/* <StatusProvider> */}
      <Main />
      {/* </StatusProvider> */}
    </ReactKeycloakProvider>
  );
}

export default App;
