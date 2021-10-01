import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { Link } from "react-router-dom";

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
                        {(user.Username)
                            ? <Nav.Item>
                                <Link to={`/`}>
                                    <Button variant="primary">Home</Button>
                                </Link>                                
                            </Nav.Item>
                            : <Nav.Item>
                                <Link to={`/`}>
                                    <Button variant="primary">Login</Button>
                                </Link>                                
                            </Nav.Item>
                        }
                        {(user.Username)
                            ? <Nav.Item>
                                <Button variant="primary" onClick={() => { onBackClick() }}>Back</Button>
                            </Nav.Item>
                            : <Nav.Item>
                                <Link to={`/register`}>
                                    <Button variant="primary">Register</Button>
                                </Link>                                
                            </Nav.Item>
                        }                        
                    </Nav>
                    <Nav className="me-auto align-items-center">
                        {(user.Username)
                            ? <Navbar.Text className="text-nowrap">
                                Logged in as {user.Username}
                            </Navbar.Text>
                            : <span></span>
                        }                        
                        {(user.Username)
                            ? <Nav.Item>
                                <Link to={`/users/` + user.Username}>
                                    <Button className="text-nowrap" variant="primary">Edit profile</Button>
                                </Link>
                            </Nav.Item>
                            : <span></span>
                        }
                        {(user.Username)
                            ? <Nav.Item>
                                <Button variant="primary" onClick={() => { onLoggedOut() }}>Logout</Button>
                            </Nav.Item>
                            : <span></span>
                        }                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default connect(mapStateToProps)(NavBar);

NavBar.propTypes = {
    onLoggedOut: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired
};