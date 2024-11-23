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
import LilyImage from "../images/pexels-charles.jpg";

export default function LilyAnimalProfile() {
	return (
		<MDBContainer className="fluid vh-100 d-flex align-items-center justify-content-center">
			<MDBCard className="w-75">
				<MDBRow className="g-0">
					<MDBCol md="4">
						<MDBCardImage src={LilyImage} alt="..." fluid />
					</MDBCol>
					<MDBCol md="8">
						<MDBCardBody>
							<MDBCardTitle>Lily</MDBCardTitle>
							<MDBCardText>
								Say hello to Lily, an adorable pug with a big personality packed
								into a small frame! Lily loves belly rubs, short strolls in the
								park, and snuggling on the couch with her favorite humans. She’s
								searching for a loving home where she can share her goofy charm
								and endless cuddles.
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
