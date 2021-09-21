import React, { useState } from 'react';
import axios from 'axios'; // library for AJAX operations
// import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

// import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [usernameInvalid, setUsernameInvalid] = useState('');
    const [password, setPassword] = useState('');
    const [passwordInvalid, setPasswordInvalid] = useState('');
    const [email, setEmail] = useState('');
    const [emailInvalid, setEmailInvalid] = useState('');
    const [birthday, setBirthday] = useState('');
    const [TOC, setTOC] = useState(false);
    const [formInvalid, setFormInvalid] = useState('');

    // instant form validation
    function validateUsername(inputValue) {
        if (!inputValue) {
            setUsernameInvalid('Username is a required field.');
            return false;
        }
        if (inputValue.length < 5) {
            setUsernameInvalid('Username needs to be at least 5 characters long.');
            return false;
        }
        if (!/^[a-z0-9]+$/i.test(inputValue)) {
            setUsernameInvalid('Username has to be purely alphanumeric.');
            return false;
        }
        // Missing: setUsernameInvalid('This username is already taken.'); needs to be based on the server response
        setUsername(inputValue);
        setUsernameInvalid('');
        return true;
    }
    function validateEmail(inputValue) {
        if (!inputValue) {
            setEmailInvalid('Email is a required field.');
            return false;
        }
        // there must be at least 1 char before the @ , at least 1 char after the @ and at least 2 chars after the .
        if (inputValue.indexOf('@') < 1 || inputValue.indexOf('.') < inputValue.indexOf('@') + 2 || inputValue.indexOf('.') + 2 >= inputValue.length) {
            setEmailInvalid('You must enter a valid email address.');
            return false;
        }
        setEmail(inputValue);
        setEmailInvalid('');
        return true;
    }
    function validatePassword(inputValue) {
        if (!inputValue) {
            setPasswordInvalid('Password is a required field.');
            return false;
        }
        if (inputValue.length < 5) {
            setPasswordInvalid('Password needs to be at least 5 characters long.');
            return false;
        }
        if (inputValue.indexOf(' ') > -1) {
            setPasswordInvalid('Password can not contain spaces.');
            return false;
        }
        if (!/\d/.test(inputValue)) {
            setPasswordInvalid('Password must have at least one number.');
            return false;
        }
        if (!/[a-zA-Z]/.test(inputValue)) {
            setPasswordInvalid('Password must have at least one letter.');
            return false;
        }
        setPassword(inputValue);
        setPasswordInvalid('');
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents the default refresh of the page when the user clicks on "submit"

        if (!passwordInvalid && !emailInvalid && !usernameInvalid && TOC) {
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
                .catch(error => {
                    console.log('error registering the user');
                    setFormInvalid(error);
                })

            // automaticaly log in
            // props.onLoggedIn(username);
        }
        else {
            setFormInvalid('Some values in the form are not valid: ' + usernameInvalid + ' ' + passwordInvalid + ' ' + emailInvalid);
        }
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder={'Username'} required onChange={e => validateUsername(e.target.value)} />
                <Form.Text className="invalid">{usernameInvalid}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    required
                    placeholder={'Password'}
                    onChange={e => validatePassword(e.target.value)} />
                <Form.Text className="invalid">{passwordInvalid}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" required placeholder={'Email'} onChange={e => validateEmail(e.target.value)} />
                <Form.Text className="invalid">{emailInvalid}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTerms">
                <Form.Check
                    type="checkbox"
                    label="I agree to the terms and conditions, as well as the data privacy statement."
                    checked={TOC}
                    onChange={() => setTOC(!TOC)}
                />
            </Form.Group>
            <div className="text-center">
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                <Form.Text className="invalid">{formInvalid}</Form.Text>
            </div>
        </Form>
    );
}

/*
<Button variant="primary" type="button" onClick={test}>test</Button>{'  '}
// validate prop data types
// see login-view for details on constraint based data validation
RegistrationView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}; */