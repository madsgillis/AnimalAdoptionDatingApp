// citations:
// 1. For using Modal React-Bootstrap: https://react-bootstrap.netlify.app/docs/components/modal/
// 2. For using Form React-Boostrap: https://react-bootstrap.netlify.app/docs/forms/overview
// 3. For auto complete React search options: https://www.geeksforgeeks.org/react-suite-autocomplete-combined-with-inputgroup/?ref=oin_asr8
import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// custom helpers
import StatusTag from '../helpers/StatusTag.js';

function ProfileForm({ formData, setFormData }) {
    // fill in values if in editing mode
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

    const statusOptions = ['Available', 'Adopted', 'On Hold', 'Currently Unavailable'];
    const sexOptions = ['F', 'M'];
    const dispositionTraitsList = ['Shy', 'Calm', 'Family Friendly', 'Sassy', 'Independent', 'Social', 'Affectionate', 'Loyal', 'Trainable',
                                'Energetic', 'Stubborn', 'Protective', 'Working Dog', 'Anxious', 'Attached', 'Vocal', 'Curious', 'Active', 'Playful', 'Adaptable']

    const [dispositionTraits, setDispositionTraits] = useState(dispositionTraitsList);
    const [selectedTraits, setSelectedTraits] = useState([]);

    /* Selecting disposition traits   */
    const handleTraitClick = (trait) => {
        setSelectedTraits((prevSelected) => {
            if (prevSelected.includes(trait)) {
                // Deselect the trait
                return prevSelected.filter((t) => t !== trait);
            } else {
                // Select the trait
                return [...prevSelected, trait];
            }
        });
    };
    
    return (
        <Form>
            {/* Date picker */}
            <Form.Group className="mb-4">
                <Form.Label>Today's Date</Form.Label>
                <Form.Control type="date" value={formData.date}
                            onChange={handleInputChange}/>
            </Form.Group>
            
            {/* NAME text input */}
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={formData.name}
                            onChange={handleInputChange}/>
            </Form.Group>
            
            {/* ROW: Gender, Age, Species */}
            <Row className= "mb-2">
                    {/* Gender: radio selection  */}
                    <Form.Group as={Col} sm={4}>
                        <Form.Label>Animal's Sex</Form.Label>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center'}}>
                        {sexOptions.map((status, index) => (
                        <div key={`status-${index}`}className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Check
                                inline
                                name="animal_sex"
                                //name="status"
                                type="radio"
                                id={`status-${index}`}
                                label={status}
                                value={status} 
                                checked={formData.animal_sex === status}
                                onChange={handleInputChange}
                            />
                        </div>
                        ))}
                        </div>
                    </Form.Group>
                    
                    {/* Age: text input */}
                    <Form.Group as={Col} sm={4}>
                        <Form.Label>Age</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            placeholder="ex. 5"
                            aria-label="Animal age"
                            aria-describedby="basic-addon2"
                            value={formData.age}  // Make sure this is properly bound
                            onChange={handleInputChange}
                            name="age"/>
                            <InputGroup.Text id="basic-addon2" >years old</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    
                    {/* Species selection  */}
                    <Form.Group as={Col} sm={4} controlId="formBasicEmail">
                        <Form.Label>Species</Form.Label>
                        <Form.Select 
                            value={formData.species} 
                            onChange={handleInputChange}>
                            <option value="">Select</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>
            </Row>
            
            {/* Status radio select one only  */}
            {/* Status options are mapped onto radio options */}
            <Form.Group className="mb-4">
                <Form.Label>Adoption Status</Form.Label>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {statusOptions.map((status, index) => (
                <div key={`status-${index}`}className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Check
                        inline
                        name="status"
                        type="radio"
                        id={`status-${index}`}
                        label={<StatusTag status={status}/>}
                        defaultChecked={index === 0}
                        value={status} 
                        checked={formData.availability === status}
                        onChange={handleInputChange}
                    />
                </div>
                ))}
                </div>
            </Form.Group>

            {/* Disposition */}
            {/* Search traits and add to list of selected traits */}
            <Row className="mb-4" rounded style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
                <Form.Group>
                        <Form.Label style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Disposition</Form.Label>
                        <Form.Text style={{ fontStyle: 'italic' }}>    --- Select the traits that best describe this animal</Form.Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {dispositionTraits.map((trait, index) => (
                                <Button
                                    key={`trait-${index}`}
                                    variant={selectedTraits.includes(trait) ? 'primary' : 'outline-primary'}
                                    onClick={() => handleTraitClick(trait)}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '14px',
                                        borderRadius: '20px', // More rounded corners for a softer look
                                        backgroundColor: selectedTraits.includes(trait) ? '#007bff' : '#f8f9fa',
                                        color: selectedTraits.includes(trait) ? 'white' : '#007bff',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s, transform 0.2s', // Smooth transition
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow
                                    }}
                                >
                                    {trait}
                                </Button>
                            ))}
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <strong>Selected Traits:</strong> {selectedTraits.join(', ')}
                        </div>
                </Form.Group>
            </Row>
            {/* Animal Description as user input */}
            <Form.Group className="mb-4">
                <Form.Label>Animal Description</Form.Label>
                <InputGroup>
                    <InputGroup.Text>Description of Animal</InputGroup.Text>
                    <Form.Control 
                        as="textarea"
                        value={formData.description} 
                        onChange={handleInputChange}   />
                </InputGroup>
            </Form.Group>

            {/* Upload animal photo here */}
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control 
                    type="file" // change back to file once file is in system
                    onChange={e => {
                        const file = e.target.files[0];
                        setFormData(prevData => ({
                          ...prevData,
                          photo: file
                        }));
                      }}/>
            </Form.Group>
        </Form>
    );

}

export default ProfileForm;

