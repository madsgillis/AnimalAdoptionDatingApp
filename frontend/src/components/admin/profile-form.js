// citations:
// 1. For using Modal React-Bootstrap: https://react-bootstrap.netlify.app/docs/components/modal/
// 2. For using Form React-Boostrap: https://react-bootstrap.netlify.app/docs/forms/overview
// 3. For auto complete React search options: https://www.geeksforgeeks.org/react-suite-autocomplete-combined-with-inputgroup/?ref=oin_asr8
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AutoComplete, Input} from "rsuite"; 
import RSuiteInputGroup from 'rsuite/InputGroup';
import SearchIcon from '@rsuite/icons/Search';
import { MDBDatepicker } from 'mdb-react-ui-kit';


// custom helpers
import StatusTag from '../helpers/StatusTag.js';

function ProfileForm() {
    const statusOptions = ['Available', 'Adopted', 'On Hold', 'Currently Unavailable'];
    const sexOptions = ['Female', 'Male'];
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
                <Form.Control type="date"/>
            </Form.Group>
            {/* NAME text input */}
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="email" placeholder="Enter name" />
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
                                name="status"
                                type="radio"
                                id={`status-${index}`}
                                label={status}
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
                            />
                            <InputGroup.Text id="basic-addon2">years old</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    
                    {/* Species selection  */}
                    <Form.Group as={Col} sm={4} controlId="formBasicEmail">
                        <Form.Label>Species</Form.Label>
                        <Form.Select defaultValue="Select">
                            <option>Select</option>
                            <option value="1">Dog</option>
                            <option value="2">Cat</option>
                            <option value="3">Bird</option>
                            <option value="3">Other</option>
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
                    <Form.Control as="textarea" aria-label="With textarea" />
                </InputGroup>
            </Form.Group>

            {/* Upload animal photo here */}
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
        </Form>
    );

}

export default ProfileForm;

