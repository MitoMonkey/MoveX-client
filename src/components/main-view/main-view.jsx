import React from 'react';
import axios from 'axios'; // library for AJAX operations

// library module for state-based routing. "BrowserRouter" relates to <Router> in the render() block
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { connect } from 'react-redux';
import { setMoves, setUser, setFavs } from '../../actions/actions'; //setUser is required for the nav-bar "logout" button

import MovesList from '../moves-list/moves-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
// import { MoveCard } from '../move-card/move-card'; Now included in MovesList
import { MoveView } from '../move-view/move-view';
import { StyleView } from '../style-view/style-view';
import { SourceView } from '../source-view/source-view';
import { ProfileView } from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import CardGroup from 'react-bootstrap/CardGroup'; Was only used in MoveCard
import Button from 'react-bootstrap/Button';

import './main-view.scss';

/*
Reduxstate format = {
    moves: [
        _id: int,
        Title: string,
        ...
    ],
    user: string (username),
    favs: string (_id1,_id2,...),
    visibilityFilter: string (move title)
}
*/

class MainView extends React.Component {
    constructor() {
        super();
    }

    // import the moves from the backend
    getMoves(token) {
        axios.get('https://move-x.herokuapp.com/moves', { // http://localhost:8080/moves
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMoves(response.data);
            })
            .catch(function (e) {
                console.log(e);
                alert(e);
            });
    }

    // Method once a user is successfully logged in
    onLoggedIn(authData) {
        console.log(authData);

        // safe username and favorite moves to store/state
        this.props.setUser(authData.user.Username);
        this.props.setFavs(authData.user.FavoriteMoves);

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
            this.props.setUser(localStorage.getItem('user'));
            this.props.setFavs(localStorage.getItem('favs'));
            this.getMoves(accessToken);
        }
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('favs');
        this.props.setUser('');
        this.props.setFavs('');
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
                console.log('error updating the user data for ' + user);
                alert(e);
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
                console.log('error deleting the account');
                alert(e);
            });
    }

    render() {
        const { moves, user } = this.props; // passed from the store by mapStateToProps

        return (
            <>
                <Router>
                    <Row className="main-view justify-content-center">
                        <Route exact path="/" render={() => {
                            // make sure user is logged in
                            if (!user) return (
                                <Col md={4}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>);

                            // Loading page is displayed if no moves could be loaded
                            if (moves.length === 0) return <div className="main-view">Loading the moves from the database. Check console for errors if it does not finish loading.</div>;

                            return <MovesList moves={moves} />;
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
                            if (match.params.username === user.username) return (
                                <ProfileView
                                    user={user.username}
                                    favMoves={moves.filter(m => user.favs.includes(m._id))}
                                    // removeFavorite={(moveId) => this.removeFavorite(moveId)}
                                    // addFavorite={(moveId) => this.addFavorite(moveId)}
                                    updateUserdata={newUserData => this.updateUserdata(newUserData)}
                                    deleteUser={() => this.deleteUser()}
                                    onBackClick={() => history.goBack()}
                                />
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
                            if (moves.length === 0) return <div className="main-view">Loading the moves from the database. Check console for errors if it does not finish loading.</div>;

                            return (
                                <MoveView
                                    move={moves.find(m => m._id === match.params.moveId)}
                                    onBackClick={() => history.goBack()}
                                // removeFavorite={(moveId) => this.removeFavorite(moveId)}
                                // addFavorite={(moveId) => this.addFavorite(moveId)}
                                // addToFavorites={() => this.addToFavorites(match.params.moveId)}
                                />
                            );
                        }} />
                        <Route path="/styles/:name" render={({ match, history }) => {
                            // make sure user is logged in
                            if (!user) return (
                                <Col md={4}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>);

                            // Loading page is displayed if no moves could be loaded
                            if (moves.length === 0) return <div className="main-view">Loading the moves from the database. Check console for errors if it does not finish loading.</div>;

                            return (
                                <StyleView
                                    style={moves.find(m => m.Style.Name === match.params.name).Style}
                                    moves={moves.filter(m => m.Style.Name === match.params.name)}
                                    onBackClick={() => history.goBack()} />
                            );
                        }} />
                        <Route path="/sources/:name" render={({ match, history }) => {
                            // make sure user is logged in
                            if (!user) return (
                                <Col md={4}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>);

                            // Loading page is displayed if no moves could be loaded
                            if (moves.length === 0) return <div className="main-view">Loading the moves from the database. Check console for errors if it does not finish loading.</div>;

                            return (
                                <SourceView
                                    source={moves.find(m => m.Source.Name === match.params.name).Source}
                                    moves={moves.filter(m => m.Source.Name === match.params.name)}
                                    onBackClick={() => history.goBack()} />
                            );
                        }} />

                    </Row>
                </Router>

                <Row className="justify-content-center">
                    {(user)
                        ? <div className="user-bar">
                            <span>Logged in as {user.username}  </span>
                            <a href={`/`} className="btn btn-primary">Home</a>{'  '}
                            <Button variant="primary" onClick={() => { this.onLoggedOut() }}>Logout</Button>{'  '}
                            <a href={`/users/` + user.username} className="btn btn-primary">Edit profile</a>
                        </div>
                        : <div className="user-bar">
                            <a href={`/`} className="btn btn-primary">Login</a>{'  '}
                            <a href={`/register`} className="btn btn-primary">Register</a>
                        </div>

                    }
                </Row>
            </>
        );
    }
}

let mapStateToProps = state => { return { moves: state.moves, user: state.user, favs: state.favs } } // retrieve the relevant state from the store (= a "selector" hook) via the connect(mapStateToProps) function
export default connect(mapStateToProps, { setMoves, setUser, setFavs })(MainView);
// second argument (=mapDispatchToProps) connects the action creators as a prop to this component, so it can be used to dispatch actions by "this.props.setMoves()"