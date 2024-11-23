import React, { useState } from 'react';
import { Card, Button, Modal, Form, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap';
import './AdoptionFeed.css';

const AdoptionPost = ({ animal, onAddComment, onDeleteComment, onToggleLike, userLikes, onHidePost }) => {
    const [showComments, setShowComments] = useState(false);
    const currentUser = "Current User"; // Replace with actual user authentication
  
    const isLiked = userLikes.includes(animal.id);

    // Add this function to get status color
    const getStatusColor = (status) => {
        switch (status) {
        case 'Available':
            return 'success';
        case 'On Hold':
            return 'warning';
        case 'Adopted':
            return 'secondary';
        case 'Currently Unavailable':
            return 'danger';
        default:
            return 'primary';
        }
    };
  
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
            style={{ zIndex: 1 }}
          >
            <span aria-label="hide post">×</span>
          </Button>
        </OverlayTrigger>
  
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
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
            <Badge 
              bg={getStatusColor(animal.adoptionStatus)}
              className="px-3 py-2 me-4"
            >
              {animal.adoptionStatus}
            </Badge>
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
          <div className="d-flex align-items-center gap-2">
            <Button 
                variant={isLiked ? "primary" : "outline-primary"}
                onClick={() => onToggleLike(animal.id)}
                className="like-button"
            >
                <span>{isLiked ? '♥' : '♡'}</span>
            </Button>
            <span className="like-count">{animal.likes}</span>
          </div>
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

export default AdoptionPost;
