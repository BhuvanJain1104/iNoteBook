import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', data.authToken);

                props.showAlert("Successfully Logged In", "success");
                navigate("/");

            } else {
                props.showAlert("Invalid Credentials", "danger");
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message); // Set error message state
        }
    };

    // Later in another component where you make authenticated requests:
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
    };

    // Use these headers in your fetch requests


    return (
        <div className='container mx-3 mt-2'>
            <div className="row justify-content-center">
                <div className="col-10 col-md-6">
                    <h2><b>LOGIN To iNoteBooK</b></h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' id="password" />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
