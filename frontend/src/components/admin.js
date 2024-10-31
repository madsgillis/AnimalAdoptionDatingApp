import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminTable from './admin-table';
import '../App.css';

function Admin() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/admin');
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network did not respond');
                }

                // Parse response as JSON
                const result = await response.json();
                console.log("Fetched data:", result); // Log parsed JSON result
                setData(result);

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    if (data.length === 0) return <p>No data available.</p>;

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
                <AdminTable data={data}/>
            </div>
        </div>
    );
}

export default Admin;