import React, {useRef, useEffect, useState} from 'react';
//import '../../App.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ProfileForm from './profile-form';
import Button from 'react-bootstrap/Button';


const EditProfile = ({children, handleClose, show, props, profileData, onUpdate}) => {

    /*
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data from backend");
                const response = await fetch('http://127.0.0.1:5000/profile', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network did not respond');
                }

                // Parse response as JSON
                const result = await response.json();
                console.log("Fetched data:", result);
                setData(result);

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);
    */

    console.info('On editProfile: Here is the pre-edit data:', profileData)
    // Default form data state
    const [formData, setFormData] = useState({
        name: '',
        species: '',
        availability: '',
        photo: '',
        animal_sex: '',
        age: '',
        dispositions: '',
        date: ''
    });

    // setting form data for edit 
    useEffect(() => {
        console.log('profileData:', profileData);
        if (profileData) {
            setFormData({
                animal_id: profileData.animal_id,
                name: profileData.animal_name,
                species: profileData.species,
                availability: profileData.availability,
                photo: profileData.photo,
                animal_sex: profileData.animal_sex,
                age: profileData.age,
                dispositions: profileData.dispositions,
                date: profileData.date
            });
        } else {    // else empty form data
            setFormData({
                animal_id: '',
                name: '',
                species: '',
                availability: '',
                photo: '',
                animal_sex: '',
                age: '',
                dispositions: '',
                date: ''
            });
        }
    }, [profileData]);
    
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/admin'); // Replace with your API endpoint
            const data = await response.json();
            // Update your state with the new data
            setFormData(data); // Assuming you want to update formData with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    /*const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);  // Call onUpdate when form is submitted with the updated data
    };*/
    const handleSubmit = async () => {
        console.log("Form submitted HERE IS AGE!", formData.age); // Log form data for debugging
    
        try {
          const response = await fetch('http://127.0.0.1:5000/edit-profile', { // Replace with your API endpoint
            method: 'PUT', // Use 'PUT' if updating existing data
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Convert formData to JSON
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const updatedData = await response.json();
          console.log('Updated data:', updatedData);
          // refetch data
          fetchData();
          // Optionally, you can call a function to refresh data or close modal here
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      };


    const handleClick = () => {
        handleSubmit(); // Call submit function
        handleClose();  // Call close function
      };

    console.log("setFormData in ParentComponent: edit-profile", setFormData);
    return(
        <div>
            <Modal show={show} onHide={handleClose} 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit Animal Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfileForm onUpdate={onUpdate} formData={formData} setFormData={setFormData}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClick}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditProfile;