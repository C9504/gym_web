import React from "react";
import { Container } from "react-bootstrap";

const Contact = () => {

    return (
        <Container className="px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-lg-8 col-xl-6 text-center">
                    <h2 className="mt-0">Pongamonos en contacto</h2>
                    <hr className="divider" />
                    <p className="text-muted mb-5">¿Listo para comenzar tu próxima meta con nosotros? Envíanos un mensaje y te responderemos lo antes posible para ayudarte a alcanzar tus objetivos de fitness.</p>
                </div>
            </div>
            <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                <div className="col-lg-6">
                    <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                        {/* <!-- Name input--> */}
                        <div className="form-floating mb-3">
                            <input className="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                            <label htmlFor="name">Nombre completo</label>
                            <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                        </div>
                        {/* <!-- Email address input--> */}
                        <div className="form-floating mb-3">
                            <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                            <label htmlFor="email">Email</label>
                            <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                            <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                        </div>
                        {/* <!-- Phone number input--> */}
                        <div className="form-floating mb-3">
                            <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                            <label htmlFor="phone">Telefono/Celular</label>
                            <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                        </div>
                        {/* <!-- Message input--> */}
                        <div className="form-floating mb-3">
                            <textarea className="form-control" id="message" type="text" placeholder="Enter your message here..." style={{ 'height': '10rem' }} data-sb-validations="required"></textarea>
                            <label htmlFor="message">Mensaje</label>
                            <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                        </div>
                        {/* <!-- Submit success message-->
                            <!---->
                            <!-- This is what your users will see when the form-->
                            <!-- has successfully submitted--> */}
                        <div className="d-none" id="submitSuccessMessage">
                            <div className="text-center mb-3">
                                <div className="fw-bolder">Form submission successful!</div>
                                To activate this form, sign up at
                                <br />
                                <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                            </div>
                        </div>
                        {/* <!-- Submit error message-->
                            <!---->
                            <!-- This is what your users will see when there is-->
                            <!-- an error submitting the form--> */}
                        <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                        {/* <!-- Submit Button--> */}
                        <div className="d-grid"><button className="btn btn-primary btn-xl disabled" id="submitButton" type="submit">Enviar</button></div>
                    </form>
                </div>
            </div>
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-lg-4 text-center mb-5 mb-lg-0">
                    <i className="bi-phone fs-2 mb-3 text-muted"></i>
                    <div>+57 317 828 1938</div>
                </div>
            </div>
        </Container>
    );
};

export default Contact;