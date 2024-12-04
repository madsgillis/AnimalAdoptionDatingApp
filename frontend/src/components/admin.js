import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminTable from './admin-table';
import '../App.css';

// icons
import { Plus } from 'react-bootstrap-icons';
import { MDBBtn } from 'mdb-react-ui-kit';

function Admin() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data from backend");
                const response = await fetch('https://animaladoptiondatingapp-production-ce4a.up.railway.app/admin', {
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
        <AdminTable data={data}/>
    </div>
    </div>
    );
}

export default Admin;
