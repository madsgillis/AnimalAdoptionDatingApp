import React, { useState } from 'react';
import { Card, Button, Modal, Form, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap';
import './AdoptionFeed.css';

const AdoptionPost = ({ animal, onAddComment, onDeleteComment, onToggleLike, userLikes, onHidePost }) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const currentUser = "Current User"; // Or get this from your auth system
  
    const isLiked = userLikes.includes(animal.animal_id);

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
  
    // Add this console.log to debug
    console.log('Animal comments:', animal.comments);
  
    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(animal.animal_id, {
                author: currentUser,
                comment_text: newComment,
                created_at: new Date().toISOString()
            });
            setNewComment('');
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
                  alt={animal.animal_name}
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div>
                <h5 className="mb-0">{animal.animal_name}</h5>
                <small className="text-muted">{animal.shelter_name}</small>
              </div>
            </div>
            <Badge 
              bg={getStatusColor(animal.adoption_status)}
              className="px-3 py-2 me-4"
            >
              {animal.adoption_status}
            </Badge>
          </div>
        </Card.Header>
  
        <Card.Body>
          <div className="mb-3">
            <img
              src={animal.photo}
              alt={`${animal.animal_name}'s photo`}
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
  
        <Card.Footer>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <Button 
                  variant={isLiked ? "primary" : "outline-primary"}
                  onClick={() => onToggleLike(animal.animal_id)}
                  className="like-button"
              >
                  <span>{isLiked ? '♥' : '♡'}</span>
              </Button>
              <span className="like-count">{animal.likes}</span>
            </div>
            <Button 
              variant="link" 
              onClick={() => setShowComments(!showComments)}
              className="text-decoration-none"
            >
              {animal.comments?.length || 0} Comments
            </Button>
          </div>

          {showComments && (
            <div className="comments-section">
              {animal.comments?.map((comment, index) => (
                <div key={index} className="comment mb-2">
                  <div className="d-flex justify-content-between">
                    <strong>{comment.author}</strong>
                    <small className="text-muted">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </small>
                  </div>
                  <p className="mb-1">{comment.comment_text}</p>
                </div>
              ))}

              {/* Add comment form */}
              <Form onSubmit={handleSubmitComment} className="mt-3">
                <Form.Group className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={!newComment.trim()}
                  >
                    Post
                  </Button>
                </Form.Group>
              </Form>
            </div>
          )}
        </Card.Footer>
      </Card>
    );
};

export default AdoptionPost;
