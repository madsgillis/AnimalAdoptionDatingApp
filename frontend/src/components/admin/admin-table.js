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
const AdminTable = ({data, searchTerm}) =>{
    const prevData = data;
    console.info('On admin-table: Here is the pre-edit data:', prevData)

    // State to keep track of current page
    const [itemsPerPage, setItemsPerPage] = useState(3);  // default is 3
    const [currentPage, setCurrentPage] = useState(1);
    //const [currentData, setCurrentData] = useState([]);
    const [currentDataNow, setCurrentDataNow] = useState([]);
    
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
    
    // store profile data for selected animal
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const handleEditShow = (animal) => {
        setSelectedAnimal(animal);  // Set the data for the profile being edited
        setShow(true); // Open the modal
    };

    // handle if edit profile was selected
    const [isEditing, setIsEditing] = useState(false);
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
      };
    
      /*
    // Fetch initial data when component mounts
    useEffect(() => {
        fetchAnimalData();
    }, []);

    // Function to fetch animal data
    const fetchAnimalData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/admin/edit-profile');
            const data = await response.json();
            setCurrentDataNow(data);
        } catch (error) {
            console.error('Error fetching animal data:', error);
        }
    };
    */
    /*// Function to handle updating data
    const postUpdatedData = async (data) => {
        try {
            const response = await fetch('/api/animals/update', {
                method: 'POST', // or 'PUT' if you're updating an existing record
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Convert data object to JSON
            });

            if (response.ok) {
                console.log('Data updated successfully!');
                fetchAnimalData();  // Fetch updated data after successful update
            } else {
                console.error('Error updating data:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending updated data:', error);
        }
    };

    */
    function handleClose() {
        setShow(false);
        setSelectedAnimal(null); // Clear the selected animal when closing
    }
    
    /*
    const onUpdate = async () => {
        // Call fetch to get updated data from the backend
        const response = await fetch('http://127.0.0.1:5000/admin');
        console.log("updated data: ", response);
        const updatedData = await response.json();
        setCurrentDataNow(updatedData);  // Update the state with the new data
    };
    */
  
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
                                                    <button onClick={() => handleEditShow(animal)}
                                                     className="btn btn-primary" id="openProfile">
                                                        <i className="bi bi-pencil"></i> Edit
                                                    </button>
                                                    <EditProfile
                                                            isEditing={isEditing}
                                                            onToggleEditMode={toggleEditMode}
                                                            /*onUpdate={onUpdate}*/
                                                            profileData={selectedAnimal}
                                                            show={show} onHide={handleClose} handleClose={handleClose} 
                                                            title="Edit Profile"
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