import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './AdoptionFeed.css';
import lunaImage from '../images/luna.jpg';
import whiskersImage from '../images/whiskers.jpg';

const AdoptionPost = ({ animal, onAddComment, onDeleteComment, onToggleLike, userLikes, onHidePost }) => {
  const [showComments, setShowComments] = useState(false);
  const currentUser = "Current User"; // Replace with actual user authentication

  const isLiked = userLikes.includes(animal.id);

  return (
    <Card className="mb-4 position-relative">
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>Hide this post from your feed</Tooltip>}
      >
        <Button
          variant="link"
          className="position-absolute top-0 end-0 p-2 m-2 rounded-circle custom-hide-btn"
          onClick={() => onHidePost(animal.id)}
        >
          <span aria-label="hide post">×</span>
        </Button>
      </OverlayTrigger>

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
        <Button 
          variant={isLiked ? "primary" : "outline-primary"}
          onClick={() => onToggleLike(animal.id)}
          className="d-flex align-items-center gap-2"
        >
          <span>{isLiked ? '♥' : '♡'}</span>
          <span>{animal.likes}</span>
        </Button>
        <Button 
          variant="outline-secondary"
          onClick={() => setShowComments(true)}
        >
          💬 {animal.comments.length}
        </Button>
        <Button variant="outline-success">
          Share
        </Button>
      </Card.Footer>

      <Modal show={showComments} onHide={() => setShowComments(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Comments for {animal.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="comments-section mb-4">
            {animal.comments.map((comment, index) => (
              <div key={index} className="comment p-3 border-bottom position-relative">
                <strong>{comment.author}</strong>
                <p className="mb-1">{comment.text}</p>
                <small className="text-muted">{comment.date}</small>
                {comment.author === currentUser && (
                  <Button
                    variant="link"
                    className="position-absolute top-0 end-0 text-danger p-2"
                    onClick={() => onDeleteComment(animal.id, index)}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Form onSubmit={(e) => {
            e.preventDefault();
            const text = e.target.comment.value;
            onAddComment(animal.id, {
              author: "Current User", // Replace with actual user
              text,
              date: new Date().toLocaleDateString()
            });
            e.target.comment.value = '';
          }}>
            <Form.Group>
              <Form.Control
                name="comment"
                as="textarea"
                rows={3}
                placeholder="Write a comment..."
              />
            </Form.Group>
            <Button type="submit" className="mt-2">
              Post Comment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

const AdoptionFeed = () => {
  const [animals, setAnimals] = React.useState([
    {
      id: 1,
      name: "Luna",
      shelter: "Happy Paws Shelter",
      description: "Luna is a friendly 2-year-old Golden Retriever looking for her forever home. She loves playing fetch and cuddling!",
      tags: ["Dog", "Golden Retriever", "Female", "Young"],
      likes: 0,
      comments: [
        {
          author: "John Doe",
          text: "Such a beautiful dog!",
          date: "2024-03-20"
        }
      ],
      photo: lunaImage
    },
    {
      id: 2,
      name: "Whiskers",
      shelter: "Feline Friends Rescue",
      description: "Meet Whiskers, a calm and affectionate 3-year-old tabby cat. He's great with children and other pets.",
      tags: ["Cat", "Tabby", "Male", "Adult"],
      likes: 0,
      comments: [],
      photo: whiskersImage
    }
  ]);

  const [userLikes, setUserLikes] = React.useState([]);
  const [hiddenPosts, setHiddenPosts] = React.useState([]);

  const handleAddComment = (animalId, newComment) => {
    setAnimals(animals.map(animal => {
      if (animal.id === animalId) {
        return {
          ...animal,
          comments: [...animal.comments, newComment]
        };
      }
      return animal;
    }));
  };

  const handleDeleteComment = (animalId, commentIndex) => {
    setAnimals(animals.map(animal => {
      if (animal.id === animalId) {
        const updatedComments = [...animal.comments];
        updatedComments.splice(commentIndex, 1);
        return {
          ...animal,
          comments: updatedComments
        };
      }
      return animal;
    }));
  };

  const handleToggleLike = (animalId) => {
    setUserLikes(prevLikes => {
      if (prevLikes.includes(animalId)) {
        return prevLikes.filter(id => id !== animalId);
      } else {
        return [...prevLikes, animalId];
      }
    });

    setAnimals(prevAnimals => 
      prevAnimals.map(animal => {
        if (animal.id === animalId) {
          return {
            ...animal,
            likes: userLikes.includes(animalId) 
              ? animal.likes - 1 
              : animal.likes + 1
          };
        }
        return animal;
      })
    );
  };

  const handleHidePost = (animalId) => {
    setHiddenPosts(prev => [...prev, animalId]);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Adoption Feed</h1>
      <Row>
        <Col lg={8} className="mx-auto">
          {animals
            .filter(animal => !hiddenPosts.includes(animal.id))
            .map((animal) => (
              <AdoptionPost 
                key={animal.id} 
                animal={animal}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
                onToggleLike={handleToggleLike}
                userLikes={userLikes}
                onHidePost={handleHidePost}
              />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default AdoptionFeed;
