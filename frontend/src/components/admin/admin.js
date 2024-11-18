import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminTable from './admin-table';
import CreateProfile from './create-profile';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './admin.css'
import searchTable from './search-table';

// icons
import { Plus } from 'react-bootstrap-icons';
import { MDBBtn, MDBInputGroup, MDBInput, MDBIcon } from 'mdb-react-ui-kit';

  function Admin() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // set and save search term to send to table:
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

    const handleSearchClick = (term) => {
        setSearchTerm(term); // Set search term when search button is clicked
    };

    /* search bar */
    const [showSearchAlert, setShowSearchAlert] = useState(false);

    /* fetching and posting data */
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data from backend");
                const response = await fetch('http://127.0.0.1:5000/admin', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network did not respond');
                }

                // Parse response as JSON
                const result = await response.json();
                console.log("Fetched data:", result);
                setData(result);

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    if (data.length === 0) return <p>No data available.</p>;

    return (
    <Container fluid="md" className="mb-3">
        <Row className="mb-5" style={{marginTop:'35px'}}>
            {/* TITLE */}
            <h1>Admin Dashboard</h1>
        </Row>
        <Row className="mb-4">
            <Col xs={12} md={6}>
                {/* H2 Title */}
                <h2 style={{textAlign: 'left' }}>Animal Profile Database</h2>
            </Col>
            <Col xs={12} md={4} className="d-flex align-items-center justify-content-md-end">
                {/* SEARCH BAR */}
                <MDBInputGroup className="w-100">
                    <MDBInput id="searchBarInputAdmin" placeholder="Search" outline value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></MDBInput>
                    {/* Heart Icon on the right */}
                    <span id="searchButtonAdminSpan" className="input-group-text">
                        <i id="searchButtonAdminIcon" className="bi bi-search-heart" onClick={() => handleSearchClick(searchTerm)} rippleColor='dark'></i>
                    </span>
                </MDBInputGroup>
            </Col>
            <Col xs={12} md={2}>
                    {/* CREATE PROFILE BUTTON */}
                    <span><i class="fa fa-angle-down"></i></span>
                    <MDBBtn className="createProfileButtonAdmin" 
                         onClick={handleShow} id="openProfile" rounded outline> <Plus size={30} color="white"/>New Profile 
                    </MDBBtn>
                    <i class="fa fa-ellipsis-h ms-3"></i>
                <CreateProfile 
                    show={show} onHide={handleClose} handleClose={handleClose} title="New Profile"
                    id='createProfileButtonElement'>
                </CreateProfile>
            </Col>
        </Row>
        {/* DISPLAY TABLE */}
        <AdminTable data={data} searchTerm={searchTerm}/>
    </Container>
    );
}

export default Admin;