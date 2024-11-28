// citations:
// 1. For using Modal React-Bootstrap: https://react-bootstrap.netlify.app/docs/components/modal/
// 2. For using Form React-Boostrap: https://react-bootstrap.netlify.app/docs/forms/overview

import React, {useRef, useEffect, useState} from 'react';
//import '../../App.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ProfileForm from './profile-form';
import Button from 'react-bootstrap/Button';

function CreateProfile({handleClose, onSubmit, show, props}) {
    return(
        <div>
            <Modal
                show={show}
                onHide={handleClose} 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Animal Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfileForm
                        handleClose={handleClose} onSubmit={onSubmit} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateProfile;


/*
const dialogRef = useRef(null);
        const handleClose = () => {
            dialogRef.current.close();
            onClose();
        }

<dialog ref={dialogRef} open={open} className="create-profile-dialog">
            <div className="create-profile-header">
                <h4>Animal Profile</h4>
                <button onClick={handleClose}> &times;</button>
            </div>
            <div className="create-profile-body">
                {children}
            </div>
            <div className="create-profile-footer">
                <button onClick={handleClose}>Close</button>
                <button>Save changes</button>
            </div>
        </dialog>*/