import React, { useState } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

// import './profile-view.scss';

export function ProfileView(props) {
    const [username, setUsername] = useState(props.user);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [deleted, setDeleted] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault(); // prevents the default refresh of the page when the user clicks on "submit"
        let newUserData = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }
        // update user data in database
        props.updateUserdata(newUserData);
    };

    const deleteAccount = () => {
        if (confirm("Do you realy want to permanently delete your user account?")) {
            props.deleteUser();
        }
    };

    return (
        <>
            <div className="user-data">
                <h3>Currently logged in as:</h3>
                <p>Username: {username}</p>
                {/* data that has not been transmitted through a prop
                <p>Password: {password}</p>
                <p>Email: {email}</p>
                <p>Birthday: {birthday}</p> 
                */}
            </div>
            <div>
                <h3>Update user data</h3>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" placeholder={birthday} onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleUpdate}>Safe changes</Button>{'  '}

                </Form>
            </div>
            <div className="delete-account">
                <h3>Delete user account</h3>
                <Button variant="warning" type="button" onClick={deleteAccount}>Delete account</Button>{'  '}
                <p className="confirmation">{deleted}</p>
            </div>
            <Link to={`/`}>
                <Button variant="primary">Home</Button>
            </Link>
        </>
    );
}

/*
// validate prop data types
RegistrationView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
    // see login-view for details on constraint based data validation
}; */