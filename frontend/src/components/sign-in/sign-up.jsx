import React from "react";
import { Link } from "react-router-dom";
import {
	MDBContainer,
	MDBInput,
	MDBCheckbox,
	MDBBtn,
	MDBIcon,
} from "mdb-react-ui-kit";

function SignUp() {
	return (
		<MDBContainer className="p-3 my-5 d-flex flex-column w-50">
			<MDBInput
				wrapperClass="mb-4"
				label="Username"
				id="form1"
				type="text"
				placeholder="Username"
			/>
			<MDBInput
				wrapperClass="mb-4"
				label="Email address"
				id="form1"
				type="email"
				placeholder="Email"
			/>
			<MDBInput
				wrapperClass="mb-4"
				label="Password"
				id="form2"
				type="password"
				placeholder="Password"
			/>

			<MDBBtn className="mb-4">Sign up</MDBBtn>

			<div className="text-center">
				<p>
					Already have an account?
					<Link to={"/sign-in"} className="link">
						Sign in
					</Link>
				</p>
			</div>
		</MDBContainer>
	);
}

export default SignUp;
