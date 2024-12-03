import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	MDBContainer,
	MDBInput,
	MDBCheckbox,
	MDBBtn,
	MDBIcon,
} from "mdb-react-ui-kit";

function SignUp() {

	// Save the values from the input fields
	const [user_name, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const signUpHandler = async (event) => {
		// Prevent page from refreshing when sign up button is clicked
		event.preventDefault();

		try {
			const response = await fetch('http://127.0.0.1:5000/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({user_name, password}),
			});

			const data = await response.json();

			if (response.ok) {
				// Successful account creation
				alert('Account creation was successful!');
			} else {
				setError(data.message || 'Account creation failed');
			}
		} catch (error) {
			setError('There was an unknown error. Please try again.');
		}
	};

	

	return (
		<MDBContainer className="p-3 my-5 d-flex flex-column w-25">

		{/* Display error message if login attempt is not successful */}
		{error && <p className="text-danger text-center">{error}</p>}
		
			<MDBInput
				wrapperClass="mb-4"
				label="Email address"
				id="form1"
				type="email"
				placeholder="Email"
				value={user_name}
				onChange={(e) => setUserName(e.target.value)}
				required
			/>
			<MDBInput
				wrapperClass="mb-4"
				label="Password"
				id="form2"
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>

			<MDBBtn className="mb-4" onClick={signUpHandler}>Sign up</MDBBtn>

			<div className="text-center">
				<p>
					Already have an account?{' '}
					<Link to={"/sign-in"} className="link">
						Sign in
					</Link>
				</p>
			</div>
		</MDBContainer>
	);
}

export default SignUp;
