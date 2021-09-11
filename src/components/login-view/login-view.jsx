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

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents the default refresh of the page when the user clicks on "submit"
        // console.log(username, password);
        /* Send a request to the server for authentication */
        axios.post('http://localhost:8080/login', { // https://move-x.herokuapp.com/
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
        // props.onLoggedIn(username);
    };

    const register = () => {
        console.log('user wants to register');
        props.register();
    };

    /*
    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="button" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={register}>Register as new user</button>
        </form>
    );
    */

    /*
    <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
                <Form.Control type="text" placeholder="John Doe" />
            </FloatingLabel>
    */
    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>{' '}
            <Button variant="primary" type="button" onClick={register}>Register as new user</Button>
        </Form>
    );
}

// validate data types
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};