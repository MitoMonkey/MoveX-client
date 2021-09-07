import React from 'react';
import axios from 'axios'; // library for AJAX operations
import { LoginView } from '../login-view/login-view';
import { MoveCard } from '../move-card/move-card';
import { MoveView } from '../move-view/move-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            moves: [],
            selectedMove: null,
            user: null
        }
    }

    // import the moves from the backend
    componentDidMount() {
        axios.get('http://localhost:8080/moves')
            .then(response => {
                this.setState({
                    moves: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    // When a move is clicked, this function is invoked and updates the state of the `selectedMove` property to that move
    setSelectedMove(newSelectedMove) {
        this.setState({
            selectedMove: newSelectedMove
        });
    }

    // Method once a user is successfully logged in
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { moves, selectedMove, user } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (moves.length === 0) return <div className="main-view" />; // empty page is displayed if no moves could be loaded

        return (
            <div className="main-view">
                {selectedMove
                    ? <MoveView move={selectedMove} onBackClick={newSelectedMove => { this.setSelectedMove(newSelectedMove); }} />
                    : moves.map(move => (
                        <MoveCard key={move._id} moveData={move} onMoveClick={(move) => { this.setSelectedMove(move) }} />
                    ))
                }
            </div>
        );
    }
}
export default MainView; // without the "default" {} would be required when importing in index.jsx