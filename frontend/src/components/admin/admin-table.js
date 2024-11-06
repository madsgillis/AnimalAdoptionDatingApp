import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'react-bootstrap/Image';
import StatusTag from '../helpers/StatusTag.js'


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
                            <tr key={animal.id}>
                                <td>{animal.id}</td>
                                <td>{animal.name}</td>
                                <td> <Image src={animal.photo} width="171" height="180"/></td>
                                <td>{animal.species}</td>
                                <td><StatusTag status={animal.status} /></td>
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