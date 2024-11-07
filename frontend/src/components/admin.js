import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminTable from './admin-table';
import '../App.css';

// icons
import { Plus } from 'react-bootstrap-icons';
import { MDBBtn } from 'mdb-react-ui-kit';


// while hardcoding in data until using database: use imports for images
import charlesImage from './images/pexels-charles.jpg';
import lilyImage from './images/Lily.jpg';
import FreddyImage from './images/pexels-freddy.jpg';
import lincolnImage from './images/lincoln.jpg';

const animalData = [
    { id: 1, name: 'Charles',  photo: charlesImage, species:'Dog', status:'Adopted' },
    { id: 3, name: 'Freddy',  photo: FreddyImage, species:'Dog', status:'Available' },
    { id: 2, name: 'Lily',  photo: lilyImage, species:'Cat', status:'On Hold' },
    { id: 4, name: 'Lincoln',  photo: lincolnImage, species:'Bird', status:'Currently Unavailable' },
  ];

function Admin() {
    return (
    <div class="container mt-5 px-2">
        <h1>Admin Page</h1>
        <div class="mb-2 d-flex justify-content-between align-items-center" style={{marginTop: '10px'}}>
            <h2 style={{textAlign: 'left' }}>Current Animal Profiles</h2>
            <div class="px-2">
                <span><i class="fa fa-angle-down"></i></span>
                <MDBBtn rounded outline style={{
                    width: '150px', 
                    height: '50px',
                }}>
                    <Plus size={30} color="blue"/>
                    New Profile 
                </MDBBtn>
                <i class="fa fa-ellipsis-h ms-3"></i>
            </div>
        </div>
    <div>
        <AdminTable data={animalData}/>
    </div>
    </div>
    );
}

export default Admin;
