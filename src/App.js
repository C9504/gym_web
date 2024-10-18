import React from "react";
import { Route, Routes } from "react-router-dom";
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

function Main() {

  const { keycloak, initialized } = useKeycloak();

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
         {keycloak.hasResourceRole('member') && (
          <>
            <Route path='/subscriptions' element={<Subscriptions />} />
            <Route path='/progress' element={<Progress />} />
            <Route path='/reservations' element={<Reservations />} />
          </>
        )}

        {keycloak.hasResourceRole('trainer') && (
          <>

          </>
        )}
        {keycloak.authenticated && (
          <>
            <Route path='/profile' element={<Profile />} />
          </>
        )}
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
