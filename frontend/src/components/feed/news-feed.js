import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import lunaImage from '../images/luna.jpg';
import whiskersImage from '../images/whiskers.jpg';
const AdoptionPost = ({ animal }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <div className="d-flex align-items-center gap-3">
          <div style={{ width: '48px', height: '48px' }} className="rounded-circle overflow-hidden">
            <img
              src={animal.photo}
              alt={animal.name}
              className="w-100 h-100 object-fit-cover"
            />
          </div>
          <div>
            <h5 className="mb-0">{animal.name}</h5>
            <small className="text-muted">{animal.shelter}</small>
          </div>
        </div>
      </Card.Header>
      
      <Card.Body>
        <div className="mb-3">
          <img
            src={animal.photo}
            alt={`${animal.name}'s photo`}
            className="w-100 rounded"
            style={{ objectFit: 'cover', aspectRatio: '16/9' }}
          />
        </div>
        <Card.Text>{animal.description}</Card.Text>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {animal.tags.map((tag, index) => (
            <span
              key={index}
              className="badge bg-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card.Body>
      
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="outline-primary">
          ♥ {animal.likes}
        </Button>
        <Button variant="outline-secondary">
          💬 {animal.comments}
        </Button>
        <Button variant="outline-success">
          Share
        </Button>
      </Card.Footer>
    </Card>
  );
};

const AdoptionFeed = () => {
  const [animals] = React.useState([
    {
      id: 1,
      name: "Luna",
      shelter: "Happy Paws Shelter",
      description: "Luna is a friendly 2-year-old Golden Retriever looking for her forever home. She loves playing fetch and cuddling!",
      tags: ["Dog", "Golden Retriever", "Female", "Young"],
      likes: 42,
      comments: 12,
      photo: lunaImage
    },
    {
      id: 2,
      name: "Whiskers",
      shelter: "Feline Friends Rescue",
      description: "Meet Whiskers, a calm and affectionate 3-year-old tabby cat. He's great with children and other pets.",
      tags: ["Cat", "Tabby", "Male", "Adult"],
      likes: 38,
      comments: 8,
      photo: whiskersImage
    }
  ]);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Adoption Feed</h1>
      <Row>
        <Col lg={8} className="mx-auto">
          {animals.map((animal) => (
            <AdoptionPost key={animal.id} animal={animal} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default AdoptionFeed;
