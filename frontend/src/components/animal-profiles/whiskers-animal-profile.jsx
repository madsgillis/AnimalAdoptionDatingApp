import React from "react";
import {
	MDBCard,
	MDBCardTitle,
	MDBCardText,
	MDBCardBody,
	MDBCardImage,
	MDBRow,
	MDBCol,
	MDBContainer,
	MDBBtn,
} from "mdb-react-ui-kit";
import whiskersImage from "../images/whiskers.jpg";

export default function WhiskersAnimalProfile() {
	return (
		<MDBContainer className="fluid vh-100 d-flex align-items-center justify-content-center">
			<MDBCard className="w-75">
				<MDBRow className="g-0">
					<MDBCol md="4">
						<MDBCardImage src={whiskersImage} alt="..." fluid />
					</MDBCol>
					<MDBCol md="8">
						<MDBCardBody>
							<MDBCardTitle>Whiskers</MDBCardTitle>
							<MDBCardText>
								Meet Whiskers, a gentle and affectionate tabby with a heart full
								of love! This curious kitty enjoys sunbathing by the window,
								chasing feather toys, and curling up for cozy naps with her
								favorite humans. Whiskers is looking for a quiet, loving home
								where she can purr her way into your heart.
							</MDBCardText>
							<MDBBtn className="m-1 btn-success">I'm interested!</MDBBtn>
							<MDBBtn className="m-1 btn-danger">Not for me, thanks</MDBBtn>
						</MDBCardBody>
					</MDBCol>
				</MDBRow>
			</MDBCard>
		</MDBContainer>
	);
}
