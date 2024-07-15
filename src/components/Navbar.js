import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import iNotebookIcon from './iNotebook.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ padding: '10px' }}>
            <Link className="navbar-brand d-flex align-items-center" to="/">
                <span className="font-weight-bold">iNotebook</span>
                <img src={iNotebookIcon} alt="Notebook Icon" style={{ marginLeft: '10px', height: '30px', background: 'transparent' }} />
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} to="/" aria-current="page">
                            <i className="fa-solid fa-house"></i> Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">
                            About
                        </Link>
                    </li>
                    {/* Add more navigation items as needed */}
                </ul>
            </div>
            <div className="mr-0px d-flex">!important
                {localStorage.getItem('token') ?
                    <button className="btn btn-primary d-flex align-items-center justify-content-center" onClick={handleLogout} style={{
                        width: '100px',
                        height: '30px',
                        background: '#343a40',
                        border: 'none',
                        color: '#ffffff',
                        marginLeft: '10px', // Optional: Add margin between buttons
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        Log Out
                    </button>
                    :
                    <>
                        <Link to="/login" className="btn btn-primary d-flex align-items-center justify-content-center" style={{
                            width: '100px',
                            height: '30px',
                            background: '#343a40',
                            border: 'none',
                            color: '#ffffff',
                            marginRight: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background-color 0.3s',
                            textDecoration: 'none'
                        }}>
                            Log In
                        </Link>
                        <Link to="/signup" className="btn btn-primary d-flex align-items-center justify-content-center" style={{
                            width: '100px',
                            height: '30px',
                            background: '#343a40',
                            border: 'none',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background-color 0.3s',
                            textDecoration: 'none'
                        }}>
                            Sign Up
                        </Link>
                    </>
                }
            </div>

        </nav>
    );
};

export default Navbar;

