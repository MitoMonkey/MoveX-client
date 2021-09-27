import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import { Link } from "react-router-dom";

// import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents the default refresh of the page when the user clicks on "submit"

        /* Send a request to the server for authentication */
        axios.post('https://move-x.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(error => {
                console.log('No such user. Error: ' + error);
            });
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control required type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control required type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <div className="text-center">
                <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>{'  '}
            </div>
        </Form>
    );
}

// validate prop data types
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
};