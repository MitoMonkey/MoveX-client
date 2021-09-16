import React from 'react';
import axios from 'axios'; // library for AJAX operations

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MoveCard } from '../move-card/move-card';
import { MoveView } from '../move-view/move-view';
import { StyleView } from '../style-view/style-view';
import { SourceView } from '../source-view/source-view';
import { ProfileView } from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

// library module for state-based routing. "BrowserRouter" relates to <Router> in the render() block
import { BrowserRouter as Router, Route, Redirect, Link, BrowserRouter } from "react-router-dom";

import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            moves: [],
            user: null,
            favs: []
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
            user: authData.user.Username,
            favs: authData.user.FavoriteMoves
        });
        // safe user data and token locally so they do not have to log again until they click the "log out" button
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        localStorage.setItem('favs', authData.user.FavoriteMoves);
        this.getMoves(authData.token);
    }

    // make login data persistent
    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
                favs: localStorage.getItem('favs')
            });
            this.getMoves(accessToken);
        }
    }

    addToFavorites(moveID) {
        let favs = this.state.favs;

        if (favs.includes(moveID)) {
            return alert('this move is already in your list of favorites');
        }
        else {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            axios.post('https://move-x.herokuapp.com/users/' + user + '/moves/' + moveID, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    const data = response.data;
                    console.log(data);

                    if (favs.length === 0) {
                        let newFavs = favs.concat(moveID);
                        localStorage.setItem('favs', newFavs);
                        this.setState({
                            favs: newFavs
                        });
                    }
                    else {
                        let newFavs = favs.concat(',' + moveID);
                        localStorage.setItem('favs', newFavs);
                        this.setState({
                            favs: newFavs
                        });
                    }

                    window.open('/users/' + user, '_self');
                })
                .catch(e => {
                    console.log('error adding ' + moveID + ' to user profile ' + user);
                });
        }
    }
    removeFavorite(moveID) {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        axios.delete('https://move-x.herokuapp.com/users/' + user + '/moves/' + moveID, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const data = response.data;
                /*
                console.log('FavoriteMoves: ' + data.FavoriteMoves);
                console.log('FavoriteMoves.length ' + data.FavoriteMoves.length);
                console.log('FavoriteMoves.toString().length ' + data.FavoriteMoves.toString().length);
                */

                let favs = this.state.favs;
                //console.log(favs.length);
                let newFavs = null;
                if (data.FavoriteMoves.toString().length === favs.length) {
                    return console.log('failed to delete move in database');
                }
                else {
                    // if it is the only move in the list
                    if (!favs.includes(',')) {
                        newFavs = favs.replace(moveID, '');
                    }
                    // if there are multiple entries and moveID is the first in the list
                    if (favs.indexOf(moveID) === 0 && favs.includes(',')) {
                        newFavs = favs.replace(moveID + ',', '');
                    }
                    // if it is the last move in the list OR anywhere in the middle
                    if (favs.indexOf(moveID) > 0) {
                        newFavs = favs.replace(',' + moveID, '');
                    }
                    localStorage.setItem('favs', newFavs);
                    this.setState({
                        favs: newFavs
                    });

                    window.open('/users/' + user, '_self');
                }
            })
            .catch(e => {
                console.log('error removing ' + moveID + ' to user profile ' + user);
            });
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('favs');
        this.setState({
            user: null,
            favs: null
        });
        window.open('/', '_self');
    }

    updateUserdata(newUserData) {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        axios.put('https://move-x.herokuapp.com/users/' + user, newUserData, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert('Userdata successfully updated. Returning to login screen.');
                this.onLoggedOut();
                window.open('/', '_self');
            })
            .catch(e => {
                console.log('error updating the user data for ' + user)
            });
    }

    deleteUser() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        axios.delete('https://move-x.herokuapp.com/users/' + user, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log(response);
                alert('User account successfully deleted. Returning to login screen.');
                this.onLoggedOut();
                window.open('/', '_self');
            })
            .catch(e => {
                console.log('error deleting the account')
            });
    }

    render() {
        const { moves, user, favs } = this.state;

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
                        <Route path="/users/:username" render={({ match, history }) => {
                            // make sure user is logged in
                            if (!user) return (
                                <Col md={4}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>);

                            // make sure users can only see their own profile
                            if (match.params.username === user) return (
                                <Col md={8}>
                                    <ProfileView
                                        user={user}
                                        favMoves={moves.filter(m => favs.includes(m._id))}
                                        removeFavorite={(moveId) => this.removeFavorite(moveId)}
                                        updateUserdata={newUserData => this.updateUserdata(newUserData)}
                                        deleteUser={() => this.deleteUser()}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );

                            return (
                                console.log('Username does not match the user that is currently logged in.')
                            );
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
                                <MoveView
                                    move={moves.find(m => m._id === match.params.moveId)}
                                    onBackClick={() => history.goBack()}
                                    addToFavorites={() => this.addToFavorites(match.params.moveId)}
                                />
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
                                    <StyleView style={moves.find(m => m.Style.Name === match.params.name).Style} moves={moves.filter(m => m.Style.Name === match.params.name)} onBackClick={() => history.goBack()} />
                                </Col>);
                        }} />
                        <Route path="/sources/:name" render={({ match, history }) => {
                            // make sure user is logged in
                            if (!user) return (
                                <Col md={4}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>);

                            // Loading page is displayed if no moves could be loaded
                            if (moves.length === 0) return <div className="main-view">Failed to load the moves database. Check console for details.</div>;

                            return (
                                <Col md={8}>
                                    <SourceView source={moves.find(m => m.Source.Name === match.params.name).Source} moves={moves.filter(m => m.Source.Name === match.params.name)} onBackClick={() => history.goBack()} />
                                </Col>);
                        }} />

                    </Row>
                </Router>

                <Row>
                    <div className="user-bar">
                        <span>Logged in as {user}  </span>
                        <Button variant="primary" onClick={() => { this.onLoggedOut() }}>Logout</Button>{'  '}
                        <a href={`/users/` + user} className="btn btn-primary">Edit profile</a>
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