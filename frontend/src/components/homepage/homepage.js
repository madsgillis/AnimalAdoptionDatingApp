import {React, useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardGroup,
    MDBBtn,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBSelectOption
} from "mdb-react-ui-kit";
import Form from 'react-bootstrap/Form';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';


// custom functions/hooks
import AnimalProfile from '../admin/animal-profile.js';
import StatusTag from '../helpers/StatusTag.js';
import NoImage from '../images/no-image.jpg';

export default function AnimalCards() {
    const [show, setShow] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState(null); // save selected profile
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]); // All profiles data

    // track filtering options
    const [selectedStatus, setSelectedStatus] = useState(''); // Track the selected adoption status
    const [selectedTraits, setSelectedTraits] = useState([]); // Track the selected traits

    // Fetching animal data (ALL PROFILES)
    useEffect(() => {
        fetch('http://127.0.0.1:5000/admin')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setFilteredData(data); // Initially show all profiles
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // Store profile data for selected animal
    const handleProfileShow = (animal) => {
        setSelectedAnimal(animal); 
        setShow(true); // Open the modal
    };

    // Close modal for edit/create
    function handleClose() {
        setSelectedAnimal(null);
        setShow(false);
    }


    /*
    FILTER BY STATUS AND/OR TRAITS
    */
    const filterData = () => {
        return data.filter((animal) => {
            // Filter by adoption status if selected
            if (selectedStatus && animal.availability !== selectedStatus) {
                return false; // Exclude this animal if it doesn't match the selected status
            }
    
            // Ensure traits is an array
            const animalTraits = Array.isArray(animal.dispositions) ? animal.dispositions : (animal.dispositions ? animal.dispositions.split(',') : []);
            console.info("animal traits list", animalTraits);
            // Filter by traits if selected
            if (selectedTraits.length > 0) {
                // Check if any of the selected traits match any of the animal's traits
                const hasMatchingTrait = selectedTraits.some((trait) => animalTraits.includes(trait.trim()));
                if (!hasMatchingTrait) {
                    return false; // exclude animal since no matching traits
                }
            }
    
            return true; // match both filters
        });
    };

    // CALL FILTER WHENEVER NEW FILTER SELECTIONS ARE MADE
    useEffect(() => {
        const filtered = filterData();
        setFilteredData(filtered); // Update filtered data only when needed
    }, [selectedStatus, selectedTraits]); // Dependency array ensures this only runs when filters change

    // HANDLE TRAIT SELECTION CHANGE FOR FILTER
    const handleTraitChange = (e) => {
        const value = e.target.value;
        setSelectedTraits((prevSelectedTraits) => {
            if (prevSelectedTraits.includes(value)) {
                return prevSelectedTraits.filter((trait) => trait !== value);
            } else {
                return [...prevSelectedTraits, value];
            }
        });
    };

    // Available traits options
    const availableTraits = [
        'Shy', 'Calm', 'Family Friendly', 'Sassy', 'Independent', 'Social', 'Affectionate',
        'Loyal', 'Trainable', 'Energetic', 'Stubborn', 'Protective', 'Working Dog', 'Anxious',
        'Attached', 'Vocal', 'Curious', 'Active', 'Playful', 'Adaptable'
    ];

    return (
        <MDBContainer style={{ minHeight: 'calc(100vh - 60px)', marginTop: '60px' }} className="fluid d-flex flex-column align-items-center justify-content-center">
            <div className='p-5 text-center bg-light mb-4'>
                <h1 className='mb-3'>Animal Dating Profiles</h1>
                <h5 className='mb-2'> <em>These are the current animals in our adoption center. Please look at each profile and match with your future best friend. </em></h5>
            </div>
                {/* Filter Bars */}
            <Container className="my-4">
                <Row className="d-flex justify-content-between g-0">
                    <Col sm="6" md="6" className="mb-2 p-0"> {/* STATUS FILTER */}
                        <h5 className="mb-2 text-start">Filter by Adoption Status</h5>
                        <Form.Select
                        label="Adoption Status"
                        value={selectedStatus}
                        onChange={e => setSelectedStatus(e.target.value)}
                        className="w-50"
                        >
                        <option value="">All</option>
                        <option value="Available">Available</option>
                        <option value="Adopted">Adopted</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Currently Unavailable">Currently Unavailable</option>
                        </Form.Select>
                    </Col>
                    <Col sm="6" md="6" className="d-flex justify-content-end mb-2 p-0"> 
                    <div className="text-end w-100">
                    <h5 className="mb-2">Filter by Traits</h5>
                    <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={
                        <Popover id="popover-basic">
                            <Popover.Header as="h3">Filter by Traits</Popover.Header>
                            <Popover.Body>
                            {availableTraits.map((trait) => (
                                <div key={trait} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={trait}
                                    id={`trait-${trait}`}
                                    onChange={handleTraitChange}
                                />
                                <label className="form-check-label" htmlFor={`trait-${trait}`}>
                                    {trait}
                                </label>
                                </div>
                            ))}
                            </Popover.Body>
                        </Popover>
                        }
                        >
                        <Button variant="primary">Click me</Button>
                    </OverlayTrigger>
                    </div>

                    {/*<div className="d-flex flex-wrap">
                        {availableTraits.map((trait) => (
                        <div key={trait} className="form-check me-3 mb-3">
                            <input
                            className="form-check-input"
                            type="checkbox"
                            value={trait}
                            checked={selectedTraits.includes(trait)}
                            onChange={handleTraitChange}
                            id={`trait-${trait}`}
                            />
                            <label className="form-check-label" htmlFor={`trait-${trait}`}>
                            {trait}
                            </label>
                        </div>
                        ))}
                    </div>
                    */}
                    </Col>
                </Row>
            </Container>
            <MDBCardGroup>
                <MDBRow className="gx-4 gy-4" style={{ justifyContent: 'center' }}>
                        {filteredData.length > 0 ? (
                        filteredData.map((animal) => (
                <MDBCol key={animal.animal_id} sm="6" md="4" lg="3" className="mb-4">
                <MDBCard style={{ width: '300px', height: '400px' }}>
                    <MDBCardImage
                    src={animal.photo || NoImage}
                    alt="..."
                    position="top"
                    style={{
                        height: '200px',
                        width: '100%',
                        objectFit: 'cover',
                    }}
                    />
                    <MDBCardBody>
                    <MDBCardTitle>{animal.animal_name}</MDBCardTitle>
                    <MDBCardTitle>
                        <StatusTag status={animal.availability} />
                    </MDBCardTitle>
                    <MDBCardText>{animal.description || 'No description available.'}</MDBCardText>
                    <MDBBtn 
                        style={{
                        whiteSpace: 'nowrap',
                        width: '200px',
                        height: '40px', 
                        padding: '5px 15px', 
                    }} onClick={() => handleProfileShow(animal)}>Find out more about me!</MDBBtn>
                    {selectedAnimal && (
                        <AnimalProfile
                        selectedAnimal={selectedAnimal}
                        show={show}
                        onHide={handleClose}
                        handleClose={handleClose}
                        />
                            )}
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        ))
        ) : (
        <div className="text-center">
            <p>No animals match your filters.</p>
        </div>
        )}
                    </MDBRow>
            </MDBCardGroup>
        </MDBContainer>
    );
}
