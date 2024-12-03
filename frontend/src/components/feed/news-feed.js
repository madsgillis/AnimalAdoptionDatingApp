import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import './AdoptionFeed.css';
import AdoptionPost from './adoption-post';
import lunaImage from '../images/luna.jpg';
import whiskersImage from '../images/whiskers.jpg';

const AdoptionFeed = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLikes, setUserLikes] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState([]);

  const [filters, setFilters] = useState({
    dog: true,
    cat: true,
    bird: true,
    other: true,
    male: true,
    female: true,
    available: true,
    onhold: true,
    adopted: true,
    unavailable: true
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:5000/api/adoption-feed');
        
        if (!response.ok) {
          throw new Error('Failed to fetch animals');
        }

        const data = await response.json();
        console.log('Fetched animals:', data);  // Debug log
        setAnimals(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching animals:', err);
        setError('Failed to load animals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);  // Empty dependency array means this runs once when component mounts

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <h1>Adoption Feed</h1>
        <div>Loading animals...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4 text-center">
        <h1>Adoption Feed</h1>
        <div className="text-danger">{error}</div>
      </Container>
    );
  }

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const filteredAnimals = animals.filter(animal => {
    const animalType = animal.species.toLowerCase();
    const gender = animal.gender.toLowerCase();
    const status = animal.adoption_status.toLowerCase().replace(/\s+/g, '');
    
    return filters[animalType] && 
           filters[gender] && 
           filters[status];
  });

  const handleAddComment = (animalId, newComment) => {
    setAnimals(animals.map(animal => {
      if (animal.animal_id === animalId) {
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
      if (animal.animal_id === animalId) {
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
    setAnimals(prevAnimals =>
      prevAnimals.map(animal => {
        if (animal.animal_id === animalId) {
          const isCurrentlyLiked = userLikes.includes(animalId);
          return {
            ...animal,
            likes: isCurrentlyLiked ? animal.likes - 1 : animal.likes + 1
          };
        }
        return animal;
      })
    );

    setUserLikes(prevLikes => {
      if (prevLikes.includes(animalId)) {
        return prevLikes.filter(id => id !== animalId);
      } else {
        return [...prevLikes, animalId];
      }
    });
  };

  const handleHidePost = (animalId) => {
    setHiddenPosts(prev => [...prev, animalId]);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 position-relative">
        <div className="w-100 text-center">
          <h1>Adoption Feed</h1>
        </div>
        <div className="position-absolute end-0 me-4">
          <Button
            variant="outline-primary"
            onClick={() => setShowFilters(!showFilters)}
            aria-controls="filter-collapse"
            aria-expanded={showFilters}
            className="d-flex align-items-center gap-2"
          >
            <span>Filters</span>
            <span className="small">{showFilters ? '▼' : '▶'}</span>
          </Button>
          
          <Collapse in={showFilters}>
            <div id="filter-collapse" className="filter-dropdown-menu">
              <div className="filter-controls">
                <h5 className="mb-3">Filter by Animal Type:</h5>
                <Form className="mb-4">
                  <div className="d-flex gap-3">
                    <Form.Check 
                      type="checkbox"
                      id="filter-dog"
                      label="Dogs"
                      name="dog"
                      checked={filters.dog}
                      onChange={handleFilterChange}
                    />
                    <Form.Check 
                      type="checkbox"
                      id="filter-cat"
                      label="Cats"
                      name="cat"
                      checked={filters.cat}
                      onChange={handleFilterChange}
                    />
                    <Form.Check 
                      type="checkbox"
                      id="filter-bird"
                      label="Birds"
                      name="bird"
                      checked={filters.bird}
                      onChange={handleFilterChange}
                    />
                    <Form.Check 
                      type="checkbox"
                      id="filter-other"
                      label="Other"
                      name="other"
                      checked={filters.other}
                      onChange={handleFilterChange}
                    />
                  </div>
                </Form>

                <h5 className="mb-3">Filter by Gender:</h5>
                <Form className="mb-4">
                  <div className="d-flex gap-3">
                    <Form.Check 
                      type="checkbox"
                      id="filter-male"
                      label="Male"
                      name="male"
                      checked={filters.male}
                      onChange={handleFilterChange}
                    />
                    <Form.Check 
                      type="checkbox"
                      id="filter-female"
                      label="Female"
                      name="female"
                      checked={filters.female}
                      onChange={handleFilterChange}
                    />
                  </div>
                </Form>

                <h5 className="mb-3">Filter by Status:</h5>
                <Form>
                  <div className="d-flex gap-3">
                    <Form.Check 
                      type="checkbox"
                      id="filter-available"
                      label="Available"
                      name="available"
                      checked={filters.available}
                      onChange={handleFilterChange}
                    />
                    <Form.Check 
                      type="checkbox"
                      id="filter-onhold"
                      label="On Hold"
                      name="onhold"
                      checked={filters.onhold}
                      onChange={handleFilterChange}
                    />
                    <Form.Check 
                      type="checkbox"
                      id="filter-adopted"
                      label="Adopted"
                      name="adopted"
                      checked={filters.adopted}
                      onChange={handleFilterChange}
                    />
                    <Form.Check 
                      type="checkbox"
                      id="filter-unavailable"
                      label="Currently Unavailable"
                      name="unavailable"
                      checked={filters.unavailable}
                      onChange={handleFilterChange}
                    />
                  </div>
                </Form>
              </div>
            </div>
          </Collapse>
        </div>
      </div>

      <Row>
        <Col lg={8} className="mx-auto">
          {filteredAnimals
            .filter(animal => !hiddenPosts.includes(animal.animal_id))
            .map((animal) => (
              <AdoptionPost 
                key={animal.animal_id} 
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
