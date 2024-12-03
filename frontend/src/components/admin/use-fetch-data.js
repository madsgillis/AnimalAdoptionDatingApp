/*
THIS FUNCTION GRABS THE ANIMAL PROFILE DATA AND RENDERS IT
USED FOR ADMIN TABLE AND REFRESHING AFTER CREATING/EDITING PROFILES
*/

import { useState, useEffect } from 'react';

function useFetchData(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data from backend");
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log("Fetched data:", result);
                setData(result);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError(error);  // Handle the error state
            }
        };

        fetchData();
    }, [url]);  // Dependency array ensures it re-fetches when the URL changes

    return {data, error};
}

export default useFetchData;
