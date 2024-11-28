// citations:
// 1. For using Modal React-Bootstrap: https://react-bootstrap.netlify.app/docs/components/modal/
// 2. For using Form React-Boostrap: https://react-bootstrap.netlify.app/docs/forms/overview
// 3. For auto complete React search options: https://www.geeksforgeeks.org/react-suite-autocomplete-combined-with-inputgroup/?ref=oin_asr8
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AutoComplete, Input} from "rsuite"; 
import RSuiteInputGroup from 'rsuite/InputGroup';
import SearchIcon from '@rsuite/icons/Search';
import { MDBDatepicker } from 'mdb-react-ui-kit';


// custom helpers
import StatusTag from '../helpers/StatusTag.js';

const ProfileForm = ({handleClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        date: '',
        name: '',
        sex: '',
        age: '',
        species: '',
        status: '',
        selectedTraits: [],
        description: ''
    });
    const statusOptions = ['Available', 'Adopted', 'On Hold', 'Currently Unavailable'];
    const sexOptions = ['Female', 'Male'];
    const dispositionTraitsList = [
        'Shy', 'Calm', 'Family Friendly', 'Sassy', 'Independent', 'Social', 'Affectionate', 'Loyal', 'Trainable',
        'Energetic', 'Stubborn', 'Protective', 'Working Dog', 'Anxious', 'Attached', 'Vocal', 'Curious',
        'Active', 'Playful', 'Adaptable']

    const [dispositionTraits, setDispositionTraits] = useState(dispositionTraitsList);
    const [selectedTraits, setSelectedTraits] = useState([]);

    /* Selecting disposition traits   */
    const handleTraitClick = (trait) => {
        setFormData((prevData) => {
            const { selectedTraits } = prevData;
            if (selectedTraits.includes(trait)) {
                // Deselect the trait if already selected
                return { ...prevData, selectedTraits: selectedTraits.filter((t) => t !== trait)};
            } else {
                // Select the trait
                return { ...prevData, selectedTraits: [...selectedTraits, trait] };
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted"); // debug
        handleClose();

        try {
            const response = await fetch('http://127.0.0.1:5000/admin/create-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // debug
            if (!response.ok) {
                console.error("Failed to create profile, status: ", response.status, response.statusText);
                const errorText = await response.text();
                console.error("Error response body: ", errorText);
                return;
            }

            const data = await response.json();

            if (response.ok) {
                // reset form
                setFormData({
                    date: '',
                    name: '',
                    sex: '',
                    age: '',
                    species: '',
                    status: '',
                    selectedTraits: [],
                    description: ''}
                );
                console.log("New profile successfully created!");
                handleClose();
            } else {
                console.error("Failed to create profile.");
            }
        } catch (error) {
            console.error("There was an error: ", error);
        }
    };
    
    return (
        <Form onSubmit={handleSubmit}>
            {/* Date picker */}
            <Form.Group className="mb-4">
                <Form.Label>Today's Date</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            {/* NAME text input */}
            <Form.Group className="mb-4" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    required
                />
            </Form.Group>
            
            {/* ROW: Gender, Age, Species */}
            <Row className= "mb-2">
                    {/* Gender: radio selection  */}
                    <Form.Group as={Col} sm={4}>
                        <Form.Label>Animal's Sex</Form.Label>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center'}}>
                        {sexOptions.map((sex, index) => (
                        <div key={`status-${index}`}className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Check
                                inline
                                key={`sex-${index}`}
                                name="sex"
                                type="radio"
                                value={sex}
                                onChange={handleChange}
                                label={sex}
                                required
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
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="ex. 5"
                            aria-label="Animal age"
                            aria-describedby="basic-addon2"
                            required
                            />
                            <InputGroup.Text id="basic-addon2">years old</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    
                    {/* Species selection  */}
                    <Form.Group as={Col} sm={4} controlId="formSpecies">
                        <Form.Label>Species</Form.Label>
                        <Form.Select
                            name="species"
                            value={formData.species}
                            onChange={handleChange}
                            required
                        >
                            <option>Select</option>
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
                        key={`status-${index}`}
                        name="status"
                        type="radio"
                        value={status}
                        onChange={handleChange}
                        label={<StatusTag status={status}/>}
                        required
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
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTraitClick(trait);
                                    }}
                                    variant={formData.selectedTraits.includes(trait) ? 'primary' : 'outline-primary'}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '14px',
                                        borderRadius: '20px', // More rounded corners for a softer look
                                        backgroundColor: formData.selectedTraits.includes(trait) ? '#007bff' : '#f8f9fa',
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
                            <strong>Selected Traits:</strong> {formData.selectedTraits.join(', ')}
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
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        //aria-label="With textarea"
                    />
                </InputGroup>
            </Form.Group>

            {/* Upload animal photo here */}
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Create Profile
            </Button>
        </Form>
    );

}

export default ProfileForm;

