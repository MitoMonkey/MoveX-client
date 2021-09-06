import React from 'react';
import axios from 'axios'; // library for AJAX operations
import { MoveCard } from '../move-card/move-card';
import { MoveView } from '../move-view/move-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            moves: [],
            selectedMove: null
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

    setSelectedMove(newSelectedMove) {
        this.setState({
            selectedMove: newSelectedMove
        });
    }

    render() {
        const { moves, selectedMove } = this.state;

        if (moves.length === 0) return <div className="main-view" />;

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