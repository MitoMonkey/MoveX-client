import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents the default refresh of the page when the user clicks on "submit"

        // constraint validation
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);

        /* Send a request to the server for authentication */
        axios.post('https://move-x.herokuapp.com/login', { // http://localhost:8080/login
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('No such user. Error: ' + e)
            });
    };

    const register = () => {
        console.log('user wants to register');
        props.register();
    };

    // noValidate attribute to disable HTML5 validations by default and access Constraint API
    return (
        <Form noValidate validated={validated}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control required type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control required type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>{' '}
            <Button variant="primary" type="button" onClick={register}>Register as new user</Button>
        </Form>
    );
}

// validate prop data types
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};