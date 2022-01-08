import React from 'react';
import axios from 'axios'; // library for AJAX operations

// library module for state-based routing. "BrowserRouter" relates to <Router> in the render() block
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { setMoves, setUser } from '../../actions/actions';

import MovesList from '../moves-list/moves-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import MoveView from '../move-view/move-view';
import { StyleView } from '../style-view/style-view';
import { SourceView } from '../source-view/source-view';
import ProfileView from '../profile-view/profile-view';
import NavBar from '../nav-bar/nav-bar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import CardGroup from 'react-bootstrap/CardGroup'; Was only used in MoveCard
// import Button from 'react-bootstrap/Button';

import './main-view.scss';

/*
Reduxstate format = {
    moves: [
        _id: int,
        Title: string,
        ...
    ],
    user: [
        username: string,
        password: string,
        email: string,
        Birthday: date,
        FavoriteMoves: array [_id1,_id2,...]
    ],
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
        // console.log(authData);

        // safe username and favorite moves to store/state
        this.props.setUser(authData.user);

        // safe user data and token locally so they do not have to log again until they click the "log out" button
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', JSON.stringify(authData.user)); // localStorage can only store strings, not arrays
        this.getMoves(authData.token);
    }

    // make login data persistent
    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (accessToken !== null) {
            this.props.setUser(user);
            this.getMoves(accessToken);
        }
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.setUser([]);
        window.open('/', '_self');
    }

    updateUserdata(newUserData) {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        axios.put('https://move-x.herokuapp.com/users/' + user.Username, newUserData, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const data = response.data;
                // console.log(data);
                alert('Userdata successfully updated. Returning to login screen.');
                this.onLoggedOut();
                window.open('/', '_self');
            })
            .catch(e => {
                console.log('error updating the user data for ' + user.Username);
                alert(e);
            });
    }

    deleteUser() {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        axios.delete('https://move-x.herokuapp.com/users/' + user.Username, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log(response);
                alert('User account successfully deleted. Returning to registration screen.');
                this.onLoggedOut();
                window.open('/register', '_self');
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
                    <NavBar onLoggedOut={() => this.onLoggedOut()} onBackClick={() => history.back()} />

                    <Row className="main-view justify-content-center">
                        <Route exact path="/" render={() => {
                            // make sure user is logged in
                            if (!user.Username) return (
                                <Col md={4}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>);

                            // Loading page is displayed if no moves could be loaded
                            if (moves.length === 0) return <div className="main-view">Loading the moves from the database. Check console for errors if it does not finish loading.</div>;

                            return <MovesList />;
                        }} />

                        <Route path="/register" render={() => {
                            if (user.Username) return <Redirect to="/" />
                            return (<Col md={4}>
                                {/* <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} /> */}
                                <RegistrationView />
                            </Col>);
                        }} />
                        <Route path="/users/:username" render={({ match, history }) => {
                            // make sure user is logged in
                            if (!user.Username) return (
                                <Col md={4}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>);

                            // make sure users can only see their own profile
                            if (match.params.username === user.Username) return (
                                <ProfileView
                                    updateUserdata={newUserData => this.updateUserdata(newUserData)}
                                    deleteUser={() => this.deleteUser()}
                                    onBackClick={() => history.goBack()} // no button on the page, but will be in NavBar anyway
                                />
                            );
                            return (
                                console.log('Username does not match the user that is currently logged in.')
                            );
                        }} />
                        <Route path="/moves/:moveId" render={({ match, history }) => {
                            // make sure user is logged in
                            if (!user.Username) return (
                                <Col md={4}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>);

                            // Loading page is displayed if no moves could be loaded
                            if (moves.length === 0) return <div className="main-view">Loading the moves from the database. Check console for errors if it does not finish loading.</div>;

                            return (
                                <MoveView
                                    move={moves.find(m => m._id === match.params.moveId)}
                                    onBackClick={() => history.goBack()}
                                />
                            );
                        }} />
                        <Route path="/styles/:name" render={({ match, history }) => {
                            // make sure user is logged in
                            if (!user.Username) return (
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
                            if (!user.Username) return (
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
            </>
        );
    }
}

// retrieve the relevant state from the store (= a "selector" hook) via the connect(mapStateToProps) function
let mapStateToProps = state => {
    return {
        moves: state.moves,
        user: state.user
    }
}

export default connect(mapStateToProps, { setMoves, setUser })(MainView);
// second argument (=mapDispatchToProps) connects the action creators as a prop to this component,
// so it can be used to dispatch actions by "this.props.setMoves()"