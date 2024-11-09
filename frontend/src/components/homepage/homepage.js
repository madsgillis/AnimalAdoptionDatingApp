import React from "react";
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardGroup,
    MDBBtn,
} from "mdb-react-ui-kit";

import lincolnImage from "../images/lincoln.jpg";
import whiskersImage from "../images/whiskers.jpg";
import LilyImage from "../images/pexels-charles.jpg";

export default function AnimalCards() {
    return (
        <MDBCardGroup className="w-75 p-5 mh-75 mx-auto">
            <MDBCard>
                <MDBCardImage
                    src={lincolnImage}
                    alt="..."
                    position="top"
                />
                <MDBCardBody>
                    <MDBCardTitle>Lincoln</MDBCardTitle>
                    <MDBCardText>Animal information goes here</MDBCardText>
                    <MDBBtn>Find out more about me!</MDBBtn>
                </MDBCardBody>
            </MDBCard>

            <MDBCard>
                <MDBCardImage src={whiskersImage} alt="..." position="top" />
                <MDBCardBody>
                    <MDBCardTitle>Whiskers</MDBCardTitle>
                    <MDBCardText>Animal information goes here</MDBCardText>
                    <MDBBtn>Find out more about me!</MDBBtn>
                </MDBCardBody>
            </MDBCard>

            <MDBCard>
                <MDBCardImage src={LilyImage} alt="..." position="top" />
                <MDBCardBody>
                    <MDBCardTitle>Lily</MDBCardTitle>
                    <MDBCardText>Animal information goes here</MDBCardText>
                    <MDBBtn>Find out more about me!</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    );
}
