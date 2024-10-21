import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Classes = () => {
    return (
        <div className="hero-section">
            <Container fluid className="px-4 px-lg-5 text-center hero-content">
                <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                    <div className="col-lg-8 text-center">
                        <h2 className="text-center mt-0">Clases para Todos los Niveles!</h2>
                        <hr className="divider divider-light" />
                        <p className="text-darked text-75 mb-4">Disfruta de una variedad de entrenamientos diseñados para todas las etapas de tu viaje fitness, desde sesiones de yoga relajante para la flexibilidad y el equilibrio, hasta entrenamientos de alta intensidad para quienes buscan desafiar sus límites.</p>
                        {/* <a className="btn btn-primary btn-xl" href="#services">Reservar ahora!</a> */}
                    </div>
                </div>
                <div className="row gx-4 gx-lg-5">
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-activity fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Variedad de Entrenamientos</h3>
                            <p className="text-white mb-0">Ofrecemos una amplia gama de clases para todos los niveles, desde yoga relajante hasta entrenamiento de alta intensidad.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-person-arms-up fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Entrenadores Profesionales</h3>
                            <p className="text-white mb-0">Nuestros instructores certificados te guiarán con técnicas adecuadas y motivación constante para que alcances tus metas.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-clock fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Horarios Flexibles</h3>
                            <p className="text-white mb-0">Elige el horario que mejor se ajuste a tu rutina diaria, con opciones matutinas, vespertinas y fines de semana.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-stars fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Resultados Garantizados</h3>
                            <p className="text-white mb-0">Con compromiso y constancia, verás resultados en poco tiempo, con clases diseñadas para maximizar tu rendimiento.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Classes;