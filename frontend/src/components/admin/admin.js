import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminTable from './admin-table';
import CreateProfile from './create-profile';

// while hardcoding in data until using database: use imports for images
import charlesImage from '../images/pexels-charles.jpg';
import lilyImage from '../images/Lily.jpg';
import FreddyImage from '../images/pexels-freddy.jpg';
import lincolnImage from '../images/lincoln.jpg';

// icons
import { Plus } from 'react-bootstrap-icons';
import { MDBBtn } from 'mdb-react-ui-kit';

const animalData = [
    { id: 1, name: 'Charles',  photo: charlesImage, species:'Dog', status:'Adopted' },
    { id: 3, name: 'Freddy',  photo: FreddyImage, species:'Dog', status:'Available' },
    { id: 2, name: 'Lily',  photo: lilyImage, species:'Cat', status:'On Hold' },
    { id: 4, name: 'Lincoln',  photo: lincolnImage, species:'Bird', status:'Currently Unavailable' },
  ];

  function Admin() {

    // state and listener events for creating profile
    /*const [showDialog, setShowDialog] = useState(false);

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    };*/
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
    <div class="container mt-5 px-2">
        <h1>Admin Page</h1>
        <div class="mb-2 d-flex justify-content-between align-items-center" style={{marginTop: '10px'}}>
            <h2 style={{textAlign: 'left' }}>Current Animal Profiles</h2>
            <div className="d-flex align-items-center ml-auto">
                <span><i class="fa fa-angle-down"></i></span>
                <MDBBtn onClick={handleShow} id="openProfile" rounded outline style={{
                    width: '150px', 
                    height: '50px',
                }}>
                    <Plus size={30} color="blue"/>
                    New Profile 
                </MDBBtn>
                <i class="fa fa-ellipsis-h ms-3"></i>
            </div>
            <CreateProfile 
                show={show} onHide={handleClose} handleClose={handleClose} title="New Profile"
                style={{ width: '100%', maxWidth: '1000px', padding: '20px' }}>
            </CreateProfile>
        </div>
    <div>
        <AdminTable data={data}/>
    </div>
    </div>
    );
}

export default Admin;