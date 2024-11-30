// citations:
// 1. For using Modal React-Bootstrap: https://react-bootstrap.netlify.app/docs/components/modal/
// 2. For using Form React-Boostrap: https://react-bootstrap.netlify.app/docs/forms/overview
// 3. For auto complete React search options: https://www.geeksforgeeks.org/react-suite-autocomplete-combined-with-inputgroup/?ref=oin_asr8
import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// custom helpers
import StatusTag from '../helpers/StatusTag.js';
import useFetchData from './use-fetch-data';

/*
    HANDLES FORM FOR CREATING AND UPDATING DATA, SENDS REQUESTS TO BACKEND
*/
const ProfileForm = ({child, formDataEdit, handleClose, mode}) => {
    
    /* SETTING STATES */
    const dispositionTraitsList = ['Shy', 'Calm', 'Family Friendly', 'Sassy', 'Independent', 'Social', 'Affectionate', 'Loyal', 'Trainable',
                                'Energetic', 'Stubborn', 'Protective', 'Working Dog', 'Anxious', 'Attached', 'Vocal', 'Curious', 'Active', 'Playful', 'Adaptable']
    const statusOptions = ['Available', 'Adopted', 'On Hold', 'Currently Unavailable'];
    const sexOptions = ['F', 'M'];
    const [dispositionTraits, setDispositionTraits] = useState(dispositionTraitsList);
    const [selectedTraits, setSelectedTraits] = useState([]);
    const [validated, setValidated] = useState(false);
    
    /* ============ Default form state for CREATE and EDIT =================================== */
        const [formData, setFormData] = useState({
            animal_id: '',
            date: '',
            name: '',
            sex: '',
            age: '',
            species: '',
            status: '',
            selectedTraits: [],
            description: ''
        });
    
        console.log("edited form data", formDataEdit);


    /* ============ EDIT MODE: fix trait formatting and set form data fields (otherwise default above) =================================== */
    useEffect(() => {
        if (mode == "edit" && formDataEdit) {

            // Normalize selected traits string 
            const normalizedTraits = Array.isArray(formDataEdit.selectedTraits)
            ? formDataEdit.selectedTraits
            : formDataEdit.selectedTraits ? formDataEdit.selectedTraits.split(',') : [];
            
            // set profile data that will be edited
            setFormData({
                animal_id: formDataEdit.animal_id,
                date: formDataEdit.date || '',
                name: formDataEdit.name || '',
                sex: formDataEdit.animal_sex || '',
                age: formDataEdit.age || '',
                species: formDataEdit.species || '',
                status: formDataEdit.availability || '',
                selectedTraits: normalizedTraits || [],
                description: formDataEdit.description || '',
            });
        }
    }, [mode, formDataEdit]);

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
    /* ===================================================================================== */

    /* HANDLE CHANGE for EDIT and CREATE */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle change for selecting traits for edit display
    useEffect(() => {
        if (formData && formData.selectedTraits) {
            setSelectedTraits(formData.selectedTraits); // Assuming dispositions are a comma-separated string
        }
    }, [formData]);
    

    /* ============ SWITCH TO EDIT OR CREATE MODE FORM SUBMISSION =================================== */
    const handleForm = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            if (mode === "edit") {
                handleEdit();
            } else {
                handleSubmit();
            }
            handleClose(); // Only close the form if it is valid
        }
        setValidated(true);
    };
    

    /* ============ EDIT (PUT and GET) =================================== */
    const handleEdit = async (e) => {

        console.log("Form submitted"); // debug
        handleClose();

        try {
            console.info("here is date logged into form data:", formData.date)
            const response = await fetch('http://127.0.0.1:5000/admin/edit-profile', {
                method: 'PUT',
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
            console.log("Profile updated successfully:", data.message);

            if (response.ok) {
                // reset form
                setFormData({
                    animal_id: '',
                    date: '',
                    name: '',
                    sex: '',
                    age: '',
                    species: '',
                    status: '',
                    selectedTraits: [],
                    description: ''}
                );
                console.log("profile updated successfully created!");
                handleClose();
            } else {
                console.error("Failed to edit profile.");
            }
        } catch (error) {
            console.error("There was an error: ", error);
        }
    };
    /* ==================================================================== */



     /* ============== REFETCH PAGE AFTER EDIT ============================================== */
    const { data, error } = useFetchData('http://127.0.0.1:5000/admin');

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    /* ======================================================================================= */



    /* ============ CREATE (POST) =================================== */
    const handleSubmit = async (e) => {

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
    /* ==================================================================== */

    return (
        <Form noValidate validated={validated} onSubmit={handleForm}>
            {/* Date picker */}
            <Form.Group className="mb-4">
                <Form.Label>Profile Start Date</Form.Label>
                <Form.Control  controlId="validationCustom01" name="date" type="datetime-local" value={formData.date} onChange={handleChange} required/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    Please select a date.
                </Form.Control.Feedback>
            </Form.Group>
            {/* NAME text input */}
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter name" value={formData.name}
                            onChange={handleChange} required/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    Please provide a name.
                </Form.Control.Feedback>
            </Form.Group>
            
            {/* ROW: Gender, Age, Species */}
            <Row className= "mb-2">
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
                                checked={formData.sex === sex}
                                label={sex}
                                required
                            />
                        </div>
                        ))}
                        </div>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please select a sex
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    {/* Age: text input */}
                    <Form.Group as={Col} sm={4}>
                        <Form.Label>Age</Form.Label>
                        <InputGroup hasValidation className="mb-3">
                            <Form.Control
                            placeholder="ex. 5"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            />
                            <InputGroup.Text id="basic-addon2">years old</InputGroup.Text>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide an estimated age.
                        </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    
                    {/* Species selection  */}
                    <Form.Group as={Col} sm={4} controlId="formBasicEmail">
                        <Form.Label>Species</Form.Label>
                        <Form.Select
                            name="species"
                            value={formData.species}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select a species</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select which species.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
            </Row>
            
            {/* Status radio select one only  */}
            {/* Status options are mapped onto radio options */}
            <Form.Group className="mb-4">
                <Form.Label>Adoption Status</Form.Label>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {statusOptions.map((element, index) => (
                <div key={`status-${index}`}className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Check
                        inline
                        checked={formData.status === element}
                        key={`status-${index}`}
                        name="status"
                        type="radio"
                        value={element}
                        onChange={handleChange}
                        label={<StatusTag status={element}/>}
                        required
                    />
                </div>
                ))}
                </div>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                            Please provide the animal status.
                        </Form.Control.Feedback>
            </Form.Group>
            
            {/* Disposition */}
            {/* Search traits and add to list of selected traits */}
            <Row className="mb-4" rounded style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
                <Form.Group>
                        <Form.Label style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Disposition</Form.Label>
                        <Form.Text style={{ fontStyle: 'italic' }}>    --- Select at least 1 trait that best describe this animal</Form.Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {dispositionTraits.map((trait, index) => (
                                <Button
                                    key={`trait-${index}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTraitClick(trait);
                                    }}
                                    required
                                    variant={formData.selectedTraits.includes(trait) ? 'primary' : 'outline-primary'}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '14px',
                                        borderRadius: '20px', // More rounded corners for a softer look
                                        backgroundColor: formData.selectedTraits.includes(trait) ? '#007bff' : '#f8f9fa',
                                        color: formData.selectedTraits.includes(trait) ? 'white' : '#007bff',
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
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please select at least one trait.
                        </Form.Control.Feedback>
                </Form.Group>
            </Row>
            {/* Animal Description as user input */}
            <Form.Group className="mb-4">
                <Form.Label>Animal Description</Form.Label>
                <InputGroup>
                    <InputGroup.Text>Description of Animal</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="With textarea"
                    name="description" value={formData.description}
                    onChange={handleChange} />
                </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            {/* Upload animal photo here */}
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
            
            <Button  variant="primary" type="submit">
                {mode === 'edit' ? 'Save Changes' : 'Create'}
            </Button>
        </Form>
    );
}


export default ProfileForm;
