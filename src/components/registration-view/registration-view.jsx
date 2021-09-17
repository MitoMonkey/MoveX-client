import React, { useState } from 'react';
import axios from 'axios'; // library for AJAX operations
// import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

// import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents the default refresh of the page when the user clicks on "submit"

        // add user to database, and propt to root directory for login
        axios.post('https://move-x.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch(e => {
                console.log('error registering the user')
            })

        // automaticaly log in
        // props.onLoggedIn(username);
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" required onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" required onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" required onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTerms">
                <Form.Check type="checkbox" label="I agree to the terms and conditions, as well as the data privacy statement." />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>{'  '}
            <Link to={`/`}>
                <Button variant="primary">Switch to Login</Button>
            </Link>
        </Form>
    );
}

/*
// validate prop data types
// see login-view for details on constraint based data validation
RegistrationView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}; */