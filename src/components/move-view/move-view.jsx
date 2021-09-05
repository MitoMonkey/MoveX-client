import React from 'react';

export class MoveView extends React.Component {
    render() {
        const { move, onBackClick } = this.props;
        return (
            <div className="move-view">
                <div className="move-Poster">
                    <img src={move.ImagePath} />
                </div>
                <div className="move-title">
                    <span className="label">Title: </span>
                    <span className="value">{move.Title}</span>
                </div>
                <div className="move-description">
                    <span className="label">Description: </span>
                    <span className="value">{move.Description}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        )
    }
}