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
import lincolnImage from "../images/lincoln.jpg";

export default function LincolnAnimalProfile() {
	return (
		<MDBContainer className="fluid vh-100 d-flex align-items-center justify-content-center">
			<MDBCard className="w-75">
				<MDBRow className="g-0">
					<MDBCol md="4">
						<MDBCardImage src={lincolnImage} alt="..." fluid />
					</MDBCol>
					<MDBCol md="8">
						<MDBCardBody>
							<MDBCardTitle>Lincoln</MDBCardTitle>
							<MDBCardText>
								Meet Lincoln, a vibrant and chatty parrot bursting with
								personality! This colorful companion loves to mimic sounds,
								enjoys treats like fresh fruit, and thrives on attention from
								his human friends. Lincoln is looking for a patient and loving
								home where he can spread his wings and share his cheerful
								spirit.
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
