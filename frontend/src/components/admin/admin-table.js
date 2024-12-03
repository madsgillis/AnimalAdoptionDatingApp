// Citations:
//  1. pagination tutorial: https://react-table-v7-docs.netlify.app/docs/examples/pagination
//  2. pagination -- https://medium.com/@thewidlarzgroup/react-table-7-sorting-filtering-pagination-and-more-6bc28af104d6

import {React, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../App.css';
import StatusTag from '../helpers/StatusTag.js';
import { Pagination } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';

// custom
import EditProfile from './edit-profile';
import AnimalProfile from './animal-profile';

let totalProfiles = 0;

// display main admin table
const AdminTable = ({data, searchTerm}) =>{
    // State to keep track of current page
    const [itemsPerPage, setItemsPerPage] = useState(5);  // default is 5
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

    // handle opening of modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [modalType, setModalType] = useState(null); // 'view' or 'edit'
    
    // store profile data for selected animal
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const handleEditShow = (animal, type) => {
        setSelectedAnimal(animal); 
        setModalType(type); // Set the data for the profile being edited
        setShow(true); // Open the modal
    };

    // close modal for edit/create
    function handleClose() {
        setShow(false);
        setSelectedAnimal(null); // Clear the selected animal when closing
        setModalType(null);
    }

    /* 
        DELETE ANIMAL PROFILE 
    */
    const DeleteProfile = async (animalId) => {
        try {
            const response = await fetch(`https://animaladoptiondatingapp-production-ce4a.up.railway.app/admin/delete-profile/${animalId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
                setSuccessMessage(result.message); // confirm user
            } else {
                console.error(result.Error);
                // Handle error (e.g., show error message)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network error
        }
    };

    const [successMessage, setSuccessMessage] = useState('');
    // update success message
    useEffect(() => {
        if (successMessage) {
            // Show popup message
            alert(successMessage);
            // Clear the success message after showing the popup
            setSuccessMessage('');
        }
    }, [successMessage]);


     /* =========== FETCH (GET) TABLE DATA ==================== */
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
                                                <td>{animal.photo ? (
                                                    <img style={{width:"100px", height:"100px", objectFit:"cover"}}src={animal.photo} alt={animal.animal_name} />
                                                    ) : (
                                                        <span>No Photo Uploaded</span>
                                                    )}        
                                                </td>
                                                <td>{animal.species}</td>
                                                <td><StatusTag status={animal.availability} /></td>
                                                <td>
                                                    <button onClick={() => handleEditShow(animal, 'view')} className="btn btn-info">
                                                        <i className="bi bi-eye"></i> View
                                                    </button>
                                                    {modalType === 'view' && selectedAnimal && (
                                                        <AnimalProfile 
                                                            selectedAnimal={selectedAnimal}
                                                            show={show} 
                                                            onHide={handleClose}
                                                            handleClose={handleClose} 
                                                        />
                                                    )}
                                                </td>
                                                <td>
                                                    <button onClick={() => handleEditShow(animal, 'edit')}
                                                     className="btn btn-primary" id="openProfile">
                                                        <i className="bi bi-pencil"></i> Edit
                                                    </button>
                                                    {modalType === 'edit' && selectedAnimal && (
                                                        <EditProfile
                                                            profileData={selectedAnimal}
                                                            show={show} onHide={handleClose} handleClose={handleClose} 
                                                            title="Edit Profile"
                                                            id='editProfileButtonElement'>
                                                        </EditProfile>
                                                    )}
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => DeleteProfile(animal.animal_id)}>
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