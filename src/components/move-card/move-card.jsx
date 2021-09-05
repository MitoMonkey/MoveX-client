import React from 'react';

export class MoveCard extends React.Component {
    render() {
        const { moveData } = this.props; // short for this.props.moveData, retrieving the parameter from main-view > moves.map() 
        return <div className="move-card">{moveData.Title}</div>;
    }
}