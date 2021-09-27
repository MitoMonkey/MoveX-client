import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { Link } from "react-router-dom";
import MoveCard from '../move-card/move-card';
import CardGroup from 'react-bootstrap/CardGroup';
import { connect } from 'react-redux';

// import './profile-view.scss';

let mapStateToProps = state => { return { moves: state.moves, user: state.user, favs: state.favs } }

function ProfileView(props) {
    const { favs, moves, user } = props;
    let favMoves = moves.filter(m => favs.includes(m._id));

    const [username, setUsername] = useState(user);
    const [usernameInvalid, setUsernameInvalid] = useState('');
    const [password, setPassword] = useState('');
    const [passwordInvalid, setPasswordInvalid] = useState('');
    const [email, setEmail] = useState('');
    const [emailInvalid, setEmailInvalid] = useState('');
    const [birthday, setBirthday] = useState('');
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

    const handleUpdate = (e) => {
        e.preventDefault(); // prevents the default refresh of the page when the user clicks on "submit"

        if (!passwordInvalid && !emailInvalid && !usernameInvalid) {
            let newUserData = {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            }
            // update user data in database
            props.updateUserdata(newUserData);
        }
        else {
            setFormInvalid('Some values in the form are not valid: ' + usernameInvalid + ' ' + passwordInvalid + ' ' + emailInvalid);
        }
    };

    const deleteAccount = () => {
        if (confirm("Do you realy want to permanently delete your user account?")) {
            props.deleteUser();
        }
    };

    // load user data into state (and as placeholders) when component is mounted
    let current_email = '';
    let current_birthday = '';
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://move-x.herokuapp.com/users/' + username, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            setUsername(response.data.Username);
            setEmail(response.data.Email);
            current_email = response.data.Email;
            console.log(current_email);
            setBirthday(response.data.Birthday);
            current_birthday = response.data.Birthday.split("T")[0];
        })
    }, []);
    /*
    function stringToDate(birthdayString) {
        var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
        return new Date(birthdayString.replace(pattern, '$1-$2-$3'));
    }
    birthday.slice(0, 10)
    
    function changeBirthday(newB) {
        console.log('current field value: ' + newB);
        console.log('current value of {birthday}' + birthday);
        let newDate = newB + 'T00:00:00.000Z';
        console.log('with added time: ' + newDate);
        setBirthday(newDate);
    }
    */

    return (
        <>
            <Col className="user-data text-center" sm={12} lg={6}>
                <h3>User Profile</h3>
                <p>Username: {props.user}</p>
                <p>Email: {current_email}</p>
                {(birthday)
                    ? <p>Birthday: {current_birthday}</p>
                    : <span></span>
                }

                <h3>Update user data</h3>
                <Form className="userData-form text-left">
                    <Row className="justify-content-center">
                        <Col sm={6}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" required value={username} onChange={e => validateUsername(e.target.value)} />
                                <Form.Text className="invalid">{usernameInvalid}</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    placeholder={'Password'}
                                    onChange={e => validatePassword(e.target.value)} />
                                <Form.Text className="invalid">{passwordInvalid}</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col sm={6}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" required value={email} onChange={e => validateEmail(e.target.value)} />
                                <Form.Text className="invalid">{emailInvalid}</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="formBirthday">
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control type="date" value={birthday.split("T")[0]} onChange={e => setBirthday(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center text-center">
                        <Col >
                            <Button variant="primary" type="submit" onClick={handleUpdate}>Safe changes</Button>
                            <Form.Text className="invalid">{formInvalid}</Form.Text>
                        </Col>
                    </Row>
                </Form>
                <div className="delete-account text-center">
                    <h3>Delete user account</h3>
                    <Button variant="danger" type="button" onClick={deleteAccount}>Delete account</Button>{'  '}
                </div>
            </Col>

            <Col className="text-center">
                <div className="user-favorites">
                    <h3>Your favorite moves</h3>
                    {(favMoves.length === 0)
                        ? <p>You did not choose any favorites yet.</p>
                        : <CardGroup className="justify-content-md-center">
                            {favMoves.map(m => (
                                <Col sm={12} md={6} key={m._id}>
                                    <MoveCard
                                        move={m}
                                    />
                                </Col>))
                            }
                        </CardGroup>}
                </div>
            </Col>
        </>
    );
}

export default connect(mapStateToProps)(ProfileView);

// validate prop data types
ProfileView.propTypes = {
    user: PropTypes.string.isRequired,
    updateUserdata: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    moves: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Cues: PropTypes.string.isRequired,
        Style: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
        Source: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Weblink: PropTypes.string.isRequired
        }).isRequired,
        VideoURL: PropTypes.string.isRequired,
        ImgURL: PropTypes.string,
        Featured: PropTypes.bool
    })).isRequired,
    favs: PropTypes.string.isRequired
};