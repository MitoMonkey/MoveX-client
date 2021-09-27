import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';

let mapStateToProps = state => { return { user: state.user } }

function NavBar(props) {

    const { user, onLoggedOut, onBackClick } = props;

    return (
        <Navbar bg="light" expand="md" sticky="top">
            <Container>
                <Navbar.Brand>Move-X</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="container-fluid  align-items-center">
                        {(user)
                            ? <Nav.Item>
                                <a href={`/`} className="btn btn-primary">Home</a>
                            </Nav.Item>
                            : <Nav.Item>
                                <a href={`/`} className="btn btn-primary">Login</a>
                            </Nav.Item>
                        }
                        {(user)
                            ? <Nav.Item>
                                <Button variant="primary" onClick={() => { onLoggedOut() }}>Logout</Button>
                            </Nav.Item>
                            : <Nav.Item>
                                <a href={`/register`} className="btn btn-primary">Register</a>
                            </Nav.Item>
                        }
                        {(user)
                            ? <Nav.Item>
                                <a href={`/users/` + user} className="btn btn-primary">Edit profile</a>
                            </Nav.Item>
                            : <span></span>
                        }
                    </Nav>
                    <Nav className="me-auto align-items-center">
                        <Navbar.Text>
                            Logged in as {user}
                        </Navbar.Text>
                        <Nav.Item>
                            <Button variant="primary" onClick={() => { onBackClick() }}>Back</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default connect(mapStateToProps)(NavBar);

NavBar.propTypes = {
    user: PropTypes.string,
    onLoggedOut: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired
};