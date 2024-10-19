import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/'); // Redirigir al inicio
  };

  return (
    <Container fluid className="d-flex vh-100 align-items-center justify-content-center bg-light">
      <Row className="text-center">
        <Col>
          <h1 className="display-1 text-danger">404</h1>
          <h2 className="mb-4">Oops! Página no encontrada</h2>
          <p className="mb-4">No te preocupes, ¡puedes volver a entrenar!</p>
          <div className="mb-4">
            <img
              src="/path-to-your-image/fitness-image.png"
              alt="Página no encontrada"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <Button variant="primary" size="lg" onClick={handleBackHome}>
            Volver al Inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
