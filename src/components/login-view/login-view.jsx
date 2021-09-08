import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        // e.preventDefault(); // prevents the default refresh of the page when the user clicks on "submit"
        console.log(username, password);
        /* Missing: Send a request to the server for authentication */
        props.onLoggedIn(username);
    };

    const register = () => {
        console.log('user wants to register');
        props.register();
    };

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
}

// validate data types
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};