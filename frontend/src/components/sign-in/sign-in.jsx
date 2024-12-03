import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	MDBContainer,
	MDBInput,
	MDBCheckbox,
	MDBBtn,
	MDBIcon,
} from "mdb-react-ui-kit";

function SignIn() {

	// Save the values from the input fields
		const [user_name, setUserName] = useState('');
		const [password, setPassword] = useState('');
		const [error, setError] = useState(null);

		const loginHandler = async (event) => {
			// Prevent page from refreshing when sign-in button is clicked
			event.preventDefault();

		try {
			const response = await fetch('http://127.0.0.1:5000/sign-in', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({user_name, password}),
			});

			const data = await response.json();

			if (response.ok) {
				// Successful login
				alert('Login was successful!');
			} else {
				setError(data.message || 'Login failed');
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

			<MDBBtn className="mb-4" onClick={loginHandler}>Sign in</MDBBtn>

			<div className="text-center">
				<p>
					Not a member?{' '}
					<Link to={"/sign-up"} className="link">
						Register
					</Link>
				</p>
			</div>
		</MDBContainer>
	);
}

export default SignIn;
