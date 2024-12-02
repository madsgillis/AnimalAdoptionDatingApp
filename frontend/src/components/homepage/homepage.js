import React from "react";
import { Link } from 'react-router-dom';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardGroup,
    MDBBtn,
    MDBContainer,
} from "mdb-react-ui-kit";
import useFetchData from '../admin/use-fetch-data.js'

import lincolnImage from "../images/lincoln.jpg";
import whiskersImage from "../images/whiskers.jpg";
import LilyImage from "../images/pexels-charles.jpg";

export default function AnimalCards() {
    const [profiles, setProfiles] = useState([]);
    /* =========== FETCH (GET) TABLE DATA ==================== */
    const { data, error } = useFetchData('http://127.0.0.1:5000/admin');
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (data.length === 0) return <p>No data available.</p>;
    /* ====================================================== */
    return (
        <MDBContainer className="fluid vh-100 d-flex align-items-center justify-content-center">
            <MDBCardGroup>
                <MDBCard>
                    <MDBCardImage
                        src={lincolnImage}
                        alt="..."
                        position="top"
                    />
                    <MDBCardBody>
                        <MDBCardTitle>Lincoln</MDBCardTitle>
                        <MDBCardText>Meet Lincoln, a charismatic parrot with a knack for mimicking sounds and a heart ready to find his forever home!</MDBCardText>
                        <Link to="/lincoln-animal-profile">
                            <MDBBtn>Find out more about me!</MDBBtn>
                        </Link>

                    </MDBCardBody>
                </MDBCard>

                <MDBCard>
                    <MDBCardImage src={whiskersImage} alt="..." position="top" />
                    <MDBCardBody>
                        <MDBCardTitle>Whiskers</MDBCardTitle>
                        <MDBCardText>Say hello to Whiskers, a sweet and curious tabby cat ready to bring love and purrs to her forever home!</MDBCardText>
                        <Link to="/whiskers-animal-profile">
                            <MDBBtn>Find out more about me!</MDBBtn>
                        </Link>
                    </MDBCardBody>
                </MDBCard>

                <MDBCard>
                    <MDBCardImage src={LilyImage} alt="..." position="top" />
                    <MDBCardBody>
                        <MDBCardTitle>Lily</MDBCardTitle>
                        <MDBCardText>Meet Lily, an irresistibly charming pug who’s ready to fill your life with cuddles and laughter!</MDBCardText>
                        <Link to="/lily-animal-profile">
                            <MDBBtn>Find out more about me!</MDBBtn>
                        </Link>
                    </MDBCardBody>
                </MDBCard>
            </MDBCardGroup>
        </MDBContainer>

    );
}
