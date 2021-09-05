import React from 'react';
import { MoveCard } from '../move-card/move-card';
import { MoveView } from '../move-view/move-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            moves: [
                { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...' },
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...' },
                { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...' }
            ],
            selectedMove: null
        }
    }

    render() {
        const { moves, selectedMove } = this.state;

        if (selectedMove) return <MoveView move={selectedMove} />;

        if (moves.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {moves.map(move => <MoveCard key={move._id} moveData={move} />)}
            </div>
        );
    }
}
export default MainView; // without the "default" {} would be required when importing in index.jsx