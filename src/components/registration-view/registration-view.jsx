import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss';

export function RegistrationView(props) {
    const [userData, setUserdata] = useState([]);
    const [username, setUsername] = useState('');

    const handleSubmit = () => {
        // e.preventDefault(); // prevents the default refresh of the page when the user clicks on "submit"
        // console.log(userData.Username, userData.Password, userData.Email, userData.Birthday);
        /* Missing: Send a request to the server for authentication */
        // props.completed();
        // console.log('registration successfully completed');
        props.onLoggedIn(username);
        console.log(username + ' logged in')
    };

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={userData.Password} onChange={e => setUserdata(userData => userData.concat(e.target.value))} />
            </label>
            <label>
                Email:
                <input type="text" value={userData.Email} onChange={e => setUserdata(userData => userData.concat(e.target.value))} />
            </label>
            <label>
                Birthday:
                <input type="text" value={userData.Birthday} onChange={e => setUserdata(userData => userData.concat(e.target.value))} />
            </label>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

// validate data types
RegistrationView.propTypes = {
    userData: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string // should be "date" (also in the form above), but that does not seem to be a valid data type
    })
    // onLoggedIn: PropTypes.func.isRequired
};