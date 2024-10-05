import { useKeycloak } from '@react-keycloak/web';
import { Button, Container } from 'react-bootstrap';
import React, { useEffect } from 'react';

const Welcome = () => {

    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        console.log(keycloak.authenticated);
    }, [initialized]);

    return (
        <div className="hero-section">
            <Container className="text-center hero-content">
            <h1 className="hero-title">El poder está en ti, nosotros te ayudamos a descubrirlo</h1>
            <p className="text-center">
                En nuestro gimnasio creemos que el verdadero poder está en ti. Te proporcionamos el espacio,
                las herramientas y el apoyo necesario para que descubras y desarrolles todo tu potencial.
                Cada sesión es un paso más hacia una versión más fuerte, saludable y plena de ti mismo.
                ¡Te acompañamos en cada desafío y celebración!
            </p>
            <Button className="btn btn-primary" onClick={() => keycloak.login({redirectUri: window.location.origin})} size="lg">INGRESAR</Button>
        </Container>
        </div>
    );
}
export default Welcome;