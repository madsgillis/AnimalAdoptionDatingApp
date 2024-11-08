import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import StatusTag from '../helpers/StatusTag.js'

// Import images
import charlesImage from './images/pexels-charles.jpg';
import lilyImage from './images/Lily.jpg';
import FreddyImage from './images/pexels-freddy.jpg';
import lincolnImage from './images/lincoln.jpg';

// Map image names to image variables
const imageMapping = {
    'FreddyImage': FreddyImage,
    'charlesImage': charlesImage,
    'lilyImage': lilyImage,
    'lincolnImage': lincolnImage,
};

// display main admin table
function AdminTable({data}) {
    return (
        <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                        <th scope="col">ID #</th>
                        <th scope="col">Name</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Species</th>
                        <th scope="col">Status</th>
                        <th scope="col">View</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((animal) => (
                            <tr key={animal.animal_id}>
                                <td>{animal.animal_id}</td>
                                <td>{animal.animal_name}</td>
                                <td>
                                    {imageMapping[animal.photo] ? (
                                        <img src={imageMapping[animal.photo]} alt={animal.animal_name} style={{ width: '171px', height: '180px' }} />
                                    ) : (
                                        <span>No Image</span> // display text if no image is found
                                    )}
                                </td>
                                <td>{animal.species}</td>
                                <td><StatusTag status={animal.availability} /></td>
                                <td>
                                    <button className="btn btn-info">
                                        <i className="bi bi-eye"></i> View
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-primary">
                                        <i className="bi bi-pencil"></i> Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">
                                        <i className="bi bi-trash"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    );
};

export default AdminTable;