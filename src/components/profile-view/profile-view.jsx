import React, { useState } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { Link } from "react-router-dom";
import { MoveCard } from '../move-card/move-card';
import CardGroup from 'react-bootstrap/CardGroup';

// import './profile-view.scss';

export function ProfileView(props) {
    const [username, setUsername] = useState(props.user);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

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
            <Col className="user-data text-center" sm={12} lg={6}>
                <h3>User Profile</h3>
                <p>Username: {props.user}</p>
                {/* data that has not been transmitted through a prop
                    <p>Password: {password}</p>
                    <p>Email: {email}</p>
                    <p>Birthday: {birthday}</p> 
                    */}

                <h3>Update user data</h3>
                <Form className="userData-form text-left">
                    <Row className="justify-content-center">
                        <Col sm={4} lg={6}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" required placeholder={username} onChange={e => setUsername(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col sm={4} lg={6}>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    placeholder={'Password'}
                                    onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col sm={4} lg={6}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" required placeholder={'Enter Email'} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col sm={4} lg={6}>
                            <Form.Group controlId="formBirthday">
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center text-center">
                        <Col >
                            <Button variant="primary" type="submit" onClick={handleUpdate}>Safe changes</Button>{'  '}
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
                    {(!props.favMoves)
                        ? <p>You did not choose any favorites yet.</p>
                        : <CardGroup className="justify-content-md-center">
                            {props.favMoves.map(m => (
                                <Col sm={12} md={6} key={m._id}>
                                    <MoveCard move={m} removeFavorite={() => props.removeFavorite(m._id)} />
                                </Col>))
                            }
                        </CardGroup>}
                </div>
            </Col>
        </>
    );
}

// validate prop data types
ProfileView.propTypes = {
    user: PropTypes.string.isRequired,
    updateUserdata: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    favMoves: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired
};