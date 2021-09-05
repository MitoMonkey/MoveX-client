import React from 'react';
import { MoveCard } from '../move-card/move-card';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            moves: [
                { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...' },
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...' },
                { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...' }
            ]
        }
    }

    render() {
        const { moves } = this.state; // Short for ´const moves = this.state.moves;´ (ES6 object destruction)
        if (moves.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {moves.map(move => <MoveCard key={move._id} moveData={move} />)}
            </div>
        );
    }
}
export default MainView; // without the "default" {} would be required when importing in index.jsx