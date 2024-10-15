import { Card } from "react-bootstrap";

const CardTestimonial = ({ name, text }) => {
    return (
        <Card className="shadow bg-white">
        {/* <Card.Img variant="top" src="/assets/img/main-img.jpg" /> */}
        <Card.Body>
            <Card.Title></Card.Title>
            <br />
            <i className="bi bi-star-fill text-warning"></i>{' '}
            <i className="bi bi-star-fill text-warning"></i>{' '}
            <i className="bi bi-star-fill text-warning"></i>{' '}
            <i className="bi bi-star-fill text-warning"></i>{' '}
            <i className="bi bi-star-half text-warning"></i>{' '}
            <i className="bi bi-star text-warning"></i>{' '}
            <Card.Text>
                <i>{text}</i>
            </Card.Text>
            <br />
            <p style={{ fontWeight: '700' }}>- {name}</p>
        </Card.Body>
    </Card>
    );
};
export default CardTestimonial;