// citations:
// 1. For using Modal React-Bootstrap: https://react-bootstrap.netlify.app/docs/components/modal/
// 2. For using Form React-Boostrap: https://react-bootstrap.netlify.app/docs/forms/overview

import React, {useRef, useEffect, useState} from 'react';
//import '../../App.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ProfileForm from './profile-form';
import Button from 'react-bootstrap/Button';

function CreateProfile({children, handleClose, show, props, onSubmit}) {

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
                    <ProfileForm onSubmit={onSubmit} handleClose={handleClose} mode="create"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    {/*<Button variant="primary" onClick={handleClose}>Add Profile</Button>*/}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateProfile;