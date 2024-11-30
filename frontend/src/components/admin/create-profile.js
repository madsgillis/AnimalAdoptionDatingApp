// citations:
// 1. For using Modal React-Bootstrap: https://react-bootstrap.netlify.app/docs/components/modal/
// 2. For using Form React-Boostrap: https://react-bootstrap.netlify.app/docs/forms/overview

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ProfileForm from './profile-form';
import Button from 'react-bootstrap/Button';

/* 
CREATES ANIMAL PROFILE AND FORM CAN BE FOUND IN ProfileForm
*/
function CreateProfile({handleClose, show, props, onSubmit}) {
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
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateProfile;