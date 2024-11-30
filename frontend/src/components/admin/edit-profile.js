import React, {useRef, useEffect, useState} from 'react';
//import '../../App.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ProfileForm from './profile-form';
import Button from 'react-bootstrap/Button';


const EditProfile = ({children, handleClose, show, props, profileData, /*onUpdate *//*isEditing, onToggleEditMode*/}) => {

    /* keep track of editing mode */
    const [isEditing, setIsEditing] = useState(true); 

    console.info('On editProfile: Here is the pre-edit data:', profileData)
    // Default form data state
    const [formData, setFormData] = useState({
        animal_id: '',
        name: '',
        species: '',
        availability: '',
        photo: '',
        animal_sex: '',
        age: '',
        selectedTraits: [],
        date: '',
        description: ''
    });

    // setting form data for edit 
    useEffect(() => {
        console.log('profileData:', profileData);
        if (profileData) {
            const formattedDate = formData.date ? new Date(formData.date).toISOString().split('T').join(' ').split('Z')[0] : null;

            setFormData({
                animal_id: profileData.animal_id,
                name: profileData.animal_name,
                species: profileData.species,
                availability: profileData.availability,
                photo: profileData.photo,
                animal_sex: profileData.animal_sex,
                age: profileData.age,
                selectedTraits: profileData.dispositions,
                date: formattedDate,
                description: profileData.description
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
                selectedTraits: [],
                date: '',
                description: ''
            });
        }
    }, [profileData]);

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
                    <ProfileForm handleClose={handleClose} /*onUpdate={onUpdate} */formDataEdit={formData} setFormData={setFormData} isEditing={isEditing}
                        onToggleEditMode={() => setIsEditing(!isEditing)}
                        mode="edit" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    {/*<Button variant="primary" onClick={handleClick}>Save changes</Button>*/}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditProfile;