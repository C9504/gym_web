import React from "react";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/public/layout";
import IdentityProvider from "./services/identity-provider";
import Welcome from "./components/public/welcome";
import Progress from "./components/private/progress";
import Contact from "./components/public/contact";
import Classes from "./components/public/classes";
import Trainers from "./components/public/trainers";

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
        <Route path='/contact' element={<Contact />} />
        <Route path='/trainers' element={<Trainers />} />
        <Route path='/classes' element={<Classes />} />
         {keycloak.hasResourceRole('member') && (
          <>
            <Route path='/progress' element={<Progress />} />
          </>
        )}

        {keycloak.hasResourceRole('trainer') && (
          <>

          </>
        )}
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ReactKeycloakProvider authClient={IdentityProvider}>
      {/* <StatusProvider> */}
      <Main />
      {/* </StatusProvider> */}
    </ReactKeycloakProvider>
  );
}

export default App;
