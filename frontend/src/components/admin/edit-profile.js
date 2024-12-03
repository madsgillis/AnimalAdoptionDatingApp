import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import ProfileForm from './profile-form';
import Button from 'react-bootstrap/Button';


const EditProfile = ({handleClose, show, props, profileData}) => {
    
    /*
    SET DEFAULT FORM DATA AND IF PROFILEDATA OBJ EXISTS, UPDATE FIELDS IN FORMDATA
    */
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
        description: '',
        photo: ''
    });

    // UPDATING FIELDS WITH PROFILE DATA FETCHED
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
                selectedTraits: profileData.dispositions,
                date: profileData.date,
                description: profileData.description,
                photo: profileData.photo
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
                description: '',
                photo: ''
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
                    <Modal.Title id="contained-modal-title-vcenter">Edit Animal Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfileForm handleClose={handleClose} formDataEdit={formData} setFormData={setFormData}
                        mode="edit" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditProfile;