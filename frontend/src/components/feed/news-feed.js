import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import './AdoptionFeed.css';
import AdoptionPost from './adoption-post';
import lunaImage from '../images/luna.jpg';
import whiskersImage from '../images/whiskers.jpg';

const AdoptionFeed = () => {
  const [animals, setAnimals] = useState([
    {
      id: 1,
      name: "Luna",
      shelter: "Happy Paws Shelter",
      description: "Luna is a friendly 2-year-old Golden Retriever looking for her forever home. She loves playing fetch and cuddling!",
      tags: ["Dog", "Golden Retriever", "Female", "Young"],
      likes: 10,
      comments: [
        {
          author: "John Doe",
          text: "Such a beautiful dog!",
          date: "2024-03-20"
        }
      ],
      photo: lunaImage,
      adoptionStatus: "Available"
    },
    {
      id: 2,
      name: "Whiskers",
      shelter: "Feline Friends Rescue",
      description: "Meet Whiskers, a calm and affectionate 3-year-old tabby cat. He's great with children and other pets.",
      tags: ["Cat", "Tabby", "Male", "Adult"],
      likes: 7,
      comments: [],
      photo: whiskersImage,
      adoptionStatus: "On Hold"
    }
  ]);

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

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const filteredAnimals = animals.filter(animal => {
    const animalType = animal.tags[0].toLowerCase();
    const gender = animal.tags[2].toLowerCase();
    const status = animal.adoptionStatus.toLowerCase().replace(/\s+/g, '');
    
    return filters[animalType] && 
           filters[gender] && 
           filters[status.toLowerCase()];
  });

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
