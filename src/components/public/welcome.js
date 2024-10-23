import { useKeycloak } from '@react-keycloak/web';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import CardTestimonial from '../customs/card-testimonial';

const Welcome = () => {

    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        console.log(keycloak.authenticated);
    }, [initialized]);

    return (
        <>
            <div className="hero-section">
                <Container className="text-center hero-content">
                    <h1 className="hero-title display-4">El poder está en ti, nosotros te ayudamos a descubrirlo</h1>
                    <p className="text-center">
                        En nuestro gimnasio creemos que el verdadero poder está en ti. Te proporcionamos el espacio,
                        las herramientas y el apoyo necesario para que descubras y desarrolles todo tu potencial.
                        Cada sesión es un paso más hacia una versión más fuerte, saludable y plena de ti mismo.
                        ¡Te acompañamos en cada desafío y celebración!
                    </p>
                    <Carousel className="mb-3">
                        <Carousel.Item>
                            <div className="d-flex justify-content-center align-items-center pt-1" style={{ height: '150px' }}>
                                <h3 className="text-center mx-3">"En Gym JP, el poder está en ti.<br/>¡Te ayudamos a descubrirlo con cada entrenamiento!"</h3>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="d-flex justify-content-center align-items-center pt-1" style={{ height: '150px' }}>
                                <h3 className="text-center mx-3">"Clases diseñadas para todos los niveles.<br/>¡Desde principiantes hasta expertos, estamos aquí para ti!"</h3>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="d-flex justify-content-center align-items-center pt-1" style={{ height: '150px' }}>
                                <h3 className="text-center mx-3">"Transforma tu cuerpo y mente en un ambiente motivador y moderno.<br/>¡Únete hoy a Gym JP!"</h3>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="d-flex justify-content-center align-items-center pt-3" style={{ height: '150px' }}>
                                <h3 className="text-center mx-3">"Entrenadores que se preocupan por tu progreso.<br/>¡Descubre tu potencial con nosotros!"</h3>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="d-flex justify-content-center align-items-center pt-3" style={{ height: '150px' }}>
                                <h3 className="text-center mx-3">"Tu bienestar es nuestra misión.<br/>¡Haz que cada entrenamiento cuente en Gym JP!"</h3>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                    {!keycloak.authenticated && (
                        <Button variant='primary' onClick={() => keycloak.login({ redirectUri: window.location.origin, locale: 'es-ES' })} size="lg">INGRESAR</Button>
                    )}
                </Container>
            </div>
            <Container className="mb-3">
                <h1 className="text-center mb-5" style={{ fontWeight: '700' }}>Testimonios</h1>
                <Row xs={1} md={4} className="g-4">
                    <Col>
                        <CardTestimonial name={`Yanelis Garcias`} text={`«Gracias a Gym JP, descubrí una fuerza en mí que no sabía que existía. Los entrenadores no solo me motivaron, sino que también me guiaron a lograr objetivos que pensé inalcanzables. Ahora, cada día me siento más fuerte y saludable. ¡El poder está en mí!»`} />
                    </Col>
                    <Col>
                        <CardTestimonial name={`Lorena Mendez`} text={`«Desde que me uní a Gym JP, mi vida ha cambiado por completo. No solo he mejorado físicamente, sino que también he ganado confianza. El equipo siempre me recuerda que el poder está en mí, y ellos están aquí para ayudarme a lograrlo.»`} />
                    </Col>
                    <Col>
                        <CardTestimonial name={`Gladis Mercado`} text={`«Los entrenadores de Gym JP realmente se preocupan por ti. Gracias a su apoyo y a las clases personalizadas, logré superar mis propios límites. Siento que finalmente he descubierto mi verdadero potencial, ¡el poder está en mí!»`} />
                    </Col>
                    <Col>
                        <CardTestimonial name={`Angie Bettin`} text={`«Nunca imaginé lo lejos que podía llegar hasta que me uní a Gym JP. El lema 'El poder está en ti' no es solo una frase, realmente lo vives en cada entrenamiento. Con su apoyo, descubrí que soy capaz de mucho más de lo que pensaba.»`} />
                    </Col>
                </Row>
            </Container>
            <footer className="text-light py-4">
                <Container fluid>
                    <Row>
                        <Col className="text-center">
                            <h5>Síguenos en redes sociales</h5>
                            <div className="d-flex justify-content-center mt-3">
                                <a href="https://facebook.com" className="text-light mx-3" aria-label="Facebook">
                                    <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>
                                </a>
                                <a href="https://twitter.com" className="text-light mx-3" aria-label="Twitter">
                                    <i className="bi bi-twitter" style={{ fontSize: '1.5rem' }}></i>
                                </a>
                                <a href="https://instagram.com" className="text-light mx-3" aria-label="Instagram">
                                    <i className="bi bi-instagram" style={{ fontSize: '1.5rem' }}></i>
                                </a>
                                <a href="https://linkedin.com" className="text-light mx-3" aria-label="LinkedIn">
                                    <i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center mt-4">
                            <p>&copy; 2024 Gym JP. Todos los derechos reservados.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
}
export default Welcome;