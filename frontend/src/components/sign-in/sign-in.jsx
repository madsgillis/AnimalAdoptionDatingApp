import React from "react";
import { Link } from "react-router-dom";
import {
	MDBContainer,
	MDBInput,
	MDBCheckbox,
	MDBBtn,
	MDBIcon,
} from "mdb-react-ui-kit";

function SignIn() {
	return (
		<MDBContainer className="p-3 my-5 d-flex flex-column w-50">
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

			<MDBBtn className="mb-4">Sign in</MDBBtn>

			<div className="text-center">
				<p>
					Not a member?
					<Link to={"/sign-up"} className="link">
						Register
					</Link>
				</p>
			</div>
		</MDBContainer>
	);
}

export default SignIn;
