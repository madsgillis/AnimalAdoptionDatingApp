import React, {useRef, useEffect, useState} from 'react';
//import '../../App.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ProfileForm from './profile-form';
import Button from 'react-bootstrap/Button';

const EditProfile = ({children, handleClose, show, props, profileData, onUpdate}) => {
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
                id: profileData.animal_id,
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
                id: '',
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);  // Call onUpdate when form is submitted with the updated data
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
                    <Button variant="primary" onClick={handleSubmit}/*onClick={handleClose*/>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditProfile;