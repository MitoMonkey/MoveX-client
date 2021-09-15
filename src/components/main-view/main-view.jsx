import React from 'react';
import axios from 'axios'; // library for AJAX operations

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MoveCard } from '../move-card/move-card';
import { MoveView } from '../move-view/move-view';
import { StyleView } from '../style-view/style-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

// library module for state-based routing. "BrowserRouter" relates to <Router> in the render() block
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            moves: [],
            user: null
        }
    }

    // import the moves from the backend
    getMoves(token) {
        axios.get('https://move-x.herokuapp.com/moves', { // http://localhost:8080/moves
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

    // Method once a user is successfully logged in
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });
        // safe user data and token locally so they do not have to log again until they click the "log out" button
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMoves(authData.token);
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

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        const { moves, user } = this.state;

        return (
            <>
                <Router>
                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/" render={() => {
                            // make sure user is logged in
                            if (!user) return (
                                <Col md={4}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>);

                            // Loading page is displayed if no moves could be loaded
                            if (moves.length === 0) return <div className="main-view">Failed to load the moves database. Check console for details.</div>;

                            return (
                                <CardGroup className="justify-content-md-center">
                                    {moves.map(m => (
                                        <Col md={3} key={m._id}>
                                            <MoveCard move={m} />
                                        </Col>
                                    ))}
                                </CardGroup>
                            );
                        }} />
                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return (<Col md={4}>
                                <RegistrationView />
                            </Col>);
                        }} />
                        <Route path="/moves/:moveId" render={({ match, history }) => {

                            // make sure user is logged in
                            if (!user) return (
                                <Col md={4}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>);

                            // Loading page is displayed if no moves could be loaded
                            if (moves.length === 0) return <div className="main-view">Failed to load the moves database. Check console for details.</div>;

                            return (<Col md={8}>
                                <MoveView move={moves.find(m => m._id === match.params.moveId)} onBackClick={() => history.goBack()} />
                            </Col>);
                        }} />
                        <Route path="/styles/:name" render={({ match, history }) => {
                            // make sure user is logged in
                            if (!user) return (
                                <Col md={4}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>);

                            // Loading page is displayed if no moves could be loaded
                            if (moves.length === 0) return <div className="main-view">Failed to load the moves database. Check console for details.</div>;

                            return (
                                <Col md={8}>
                                    <StyleView style={moves.find(m => m.Style.Name === match.params.name).Style} onBackClick={() => history.goBack()} />
                                </Col>);
                        }} />
                        {/* Routes that are not ready yet (Views are missing)
                        <Route exact path="/genres/:name" render={} />
                        */}
                    </Row>
                </Router>

                <Row>
                    <div className="user-bar">
                        <span>Logged in as {user}  </span>
                        <Button variant="primary" onClick={() => { this.onLoggedOut() }}>Logout</Button>{'  '}
                        <Button variant="primary" >Edit profile</Button>
                    </div>
                </Row>

            </>
        );
        /* To add for user-bar / navigation
        // condition that userbar is only displayed after login. 
            // Easiest solution: Integrate it into all other views.
            // more optimized solution, but not valid like this:
                {if (user) 
                    // user bar
                }; */
    }
}
export default MainView; // without the "default" {} would be required when importing in index.jsx