import React from 'react';
import axios from 'axios'; // library for AJAX operations
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MoveCard } from '../move-card/move-card';
import { MoveView } from '../move-view/move-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            moves: [],
            selectedMove: null,
            user: null,
            registerRequest: false
        }
    }

    // import the moves from the backend
    getMoves(token) {
        axios.get('http://localhost:8080/moves', { // https://move-x.herokuapp.com/moves
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    moves: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // make login data persistent
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMoves(accessToken);
        }
    }

    // When a move is clicked, this function is invoked and updates the state of the `selectedMove` property to that move
    setSelectedMove(newSelectedMove) {
        this.setState({
            selectedMove: newSelectedMove
        });
    }

    // Method once a user is successfully logged in
    /* onLoggedIn(user) {
        this.setState({
            user,
            registerRequest: false
        });
    } */
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username,
            registerRequest: false
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMoves(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    // trigger re-render from login screen when user wants to register
    registerOn() {
        this.setState({
            registerRequest: true
        });
    }
    /*
    registerOff() {
        this.setState({
            registerRequest: false
        });
    }
    */

    render() {
        const { moves, selectedMove, user, registerRequest } = this.state;

        if (registerRequest) return (
            <Row className="main-view justify-content-md-center">
                <Col md={4}>
                    <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
            </Row>
        );  //completed={() => this.registerOff()}

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return (
            <Row className="main-view justify-content-md-center">
                <Col md={4}>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} register={() => this.registerOn()} />
                </Col>
            </Row>
        );

        if (moves.length === 0) return <div className="main-view" />; // empty page is displayed if no moves could be loaded

        return (
            <div>
                <Row className="main-view justify-content-md-center">
                    {selectedMove
                        ? (
                            <Col md={8}>
                                <MoveView move={selectedMove} onBackClick={newSelectedMove => { this.setSelectedMove(newSelectedMove); }} />
                            </Col>
                        )
                        : (
                            moves.map(move => (
                                <Col md={3} className="move-card">
                                    <CardGroup>
                                        <MoveCard key={move._id} moveData={move} onMoveClick={(move) => { this.setSelectedMove(move) }} />
                                    </CardGroup>
                                </Col>
                            ))
                        )
                    }
                </Row>
                <Row>
                    <Button variant="primary" onClick={() => { this.onLoggedOut() }}>Logout</Button>
                </Row>
            </div>
        );
    }
}
export default MainView; // without the "default" {} would be required when importing in index.jsx