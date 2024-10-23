import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminTable from './admin-table';
import '../App.css';

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
        <div>
            <div style={{ marginBottom: '50px' , backgroundColor: '#979feb'}} fluid className="text-black py-3">
                <head>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"/>
                </head>
                <h1>Admin Page</h1>
                <p>Edit, upload, and delete pet profiles here</p>
            </div>
            <div class="container">
            <h2 style={{textAlign: 'left' }}>Current Animal Profiles</h2>
                <AdminTable data={animalData}/>
            </div>
        </div>
    );
}

export default Admin;