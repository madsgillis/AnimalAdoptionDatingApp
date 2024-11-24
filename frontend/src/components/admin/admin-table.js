// Citations:
//  1. pagination tutorial: https://react-table-v7-docs.netlify.app/docs/examples/pagination
//  2. pagination -- https://medium.com/@thewidlarzgroup/react-table-7-sorting-filtering-pagination-and-more-6bc28af104d6

import {React, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../App.css';
import StatusTag from '../helpers/StatusTag.js';
import { Pagination } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import EditProfile from './edit-profile';

// Import images
import charlesImage from '../images/pexels-charles.jpg';
import lilyImage from '../images/Lily.jpg';
import FreddyImage from '../images/pexels-freddy.jpg';
import lincolnImage from '../images/lincoln.jpg';

// Map image names to image variables
const imageMapping = {
    'FreddyImage': FreddyImage,
    'charlesImage': charlesImage,
    'lilyImage': lilyImage,
    'lincolnImage': lincolnImage,
};

let totalProfiles = 0;

// display main admin table
function AdminTable({data, searchTerm}) {

    // State to keep track of current page
    const [itemsPerPage, setItemsPerPage] = useState(3);  // default is 3
    const [currentPage, setCurrentPage] = useState(1);
    
    // number of items per page, dependent on user drop down selection
    const handleItemsPerPageChange = (num) => {
        setItemsPerPage(num);
        setCurrentPage(1);  // reset
    };

    // Filter data for searchTerm prop
    const filteredData = data.filter((animal) =>
        animal.animal_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        animal.species.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Slice data for the current page, display correct number 
    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // profile count
    totalProfiles = data.length;

    // edit button
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return (
        <Container fluid>
            <div id="adminTableWrapper">
                <Row id="adminTable">
                    <div>
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
                                        {currentData.map((animal) => (
                                            <tr key={animal.animal_id}>
                                                <td>{animal.animal_id}</td>
                                                <td>{animal.animal_name}</td>
                                                <td>
                                                    {imageMapping[animal.photo] ? (
                                                        <img src={imageMapping[animal.photo]} alt={animal.animal_name} id="animalPhotos" />
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
                                                    <button className="btn btn-primary" onClick={handleShow} id="openProfile">
                                                        <i className="bi bi-pencil"></i> Edit
                                                    </button>
                                                    <EditProfile 
                                                            show={show} onHide={handleClose} handleClose={handleClose} title="Edit Profile"
                                                            id='editProfileButtonElement'>
                                                    </EditProfile>
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
                    </div>
                </Row>
                <Row id='adminTablePagination' className="justify-content-between">
                        {/* Table page controls displayed at bottom of table */}
                        <Col className="d-flex justify-content-left">
                            <Pagination id="paginationTable">
                                <Pagination.First id="paginationTable" onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                                <Pagination.Prev  id="paginationTable" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                                {[...Array(totalPages).keys()].map((pageNum) => (
                                    <Pagination.Item id="paginationTable"
                                        key={pageNum + 1}
                                        active={pageNum + 1 === currentPage}
                                        onClick={() => handlePageChange(pageNum + 1)}
                                    >
                                        {pageNum + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next id="paginationTable" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                                <Pagination.Last id="paginationTable" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                            </Pagination>
                        </Col>
                        
                        {/* Shows how many profiles are displaying in table out of total*/}
                        <Col className="d-flex justify-content-center"> <p>Showing {currentData.length} of {data.length} results</p> </Col>
                        
                        {/* Let user select how many profiles display in table */}
                        <Col className="d-flex justify-content-end">
                            <Dropdown> 
                                <Dropdown.Toggle id="rowSelectionButton">
                                    Show Rows
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleItemsPerPageChange(5)} href="#/action-1">5</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleItemsPerPageChange(10)} href="#/action-2">10</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleItemsPerPageChange(15)} href="#/action-3">15</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleItemsPerPageChange(100)} href="#/action-3">100</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                </Row>
            </div>
        </Container>
    );
};

export default AdminTable;