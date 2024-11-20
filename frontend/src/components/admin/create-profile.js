// citations:
// 1. For using Modal React-Bootstrap: https://react-bootstrap.netlify.app/docs/components/modal/
// 2. For using Form React-Boostrap: https://react-bootstrap.netlify.app/docs/forms/overview

import React, {useRef, useEffect, useState} from 'react';
//import '../../App.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ProfileForm from './profile-form';
import Button from 'react-bootstrap/Button';


function CreateProfile({children, handleClose, show, props, profileData}) {
    console.log("Animal Name:", profileData); 
    
    // updating information once save is hit during edit mode
    const updateAnimal = async (updatedData) => {
        try {
          const response = await fetch('http://127.0.0.1:5000/admin/edit-profile', {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData), // Send the updated data as JSON
          });
      
          if (!response.ok) {
            throw new Error("Failed to update animal data");
          }
      
          const result = await response.json();
          console.log("Update successful:", result);
          return result
      } catch (error) {
          console.error("Error updating animal data:", error);
      }
    };

    const handleSave = () => {
        // Make sure all the form data is collected
        const updatedData = {
            id: formData.animal_id, // Ensure animal_id is included
            name: formData.animal_name,
            species: formData.species,
            availability: formData.availability,
            animal_sex: formData.animal_sex,
            age: formData.age,
            photo: formData.photo,
            description: formData.description
        };
        console.log("Here is updated data:", updatedData);
    };
    
    // Default form data state
    const [formData, setFormData] = useState({
        name: '',
        species: '',
        availability: '',
        photo: '',
        animal_sex: '',
        age: ''
    });
    
    useEffect(() => {
        if (profileData) {
            setFormData({
                id: profileData.animal_id,
                name: profileData.animal_name,
                species: profileData.species,
                availability: profileData.availability,
                photo: profileData.photo,
                animal_sex: profileData.animal_sex,
                age: profileData.age
            });
        } else {
            setFormData({
                id: '',
                name: '',
                species: '',
                availability: '',
                photo: '',
                animal_sex: '',
                age: ''
            });
        }
    }, [profileData]);

    return(
        <div>
            <Modal show={show} onHide={handleClose} 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Create Animal Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfileForm formData={formData} setFormData={setFormData}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" 
                        onClick={() => {
                            handleSave();  // Calls the save logic
                            handleClose(); // Closes the modal
                        }}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
 }
export default CreateProfile;