import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth/createuser', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', data.authToken);
                props.showAlert("Account Created Successfully ", "success")
                navigate("/");

            } else {
                props.showAlert("Invalid Details", "danger")
            }

        } catch (error) {
            console.error('Error signing up:', error);
            setError('Error signing up. Please try again.'); // Generic error message
        }
    };

    return (
        <div className='container mx-3 mt-2'>
            <div className="row justify-content-center">
                <div className="col-10 col-md-6">
                    <h2><b>Create Account To Use iNoteBooK</b></h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name='name' required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' id="password" minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' minLength={5} required />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
