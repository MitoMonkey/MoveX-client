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
                <div className="move-style">
                    <span className="label">Style: </span>
                    <span className="value">{move.style.name}</span>
                </div>
                <div className="move-source">
                    <span className="label">Source: </span>
                    <span className="value">{move.source.name}</span>
                </div>
                <div className="move-cues">
                    <span className="label">Cues: </span>
                    <span className="value">{move.cues}</span>
                </div>
                <div className="move-videoLink">
                    <span className="label">Video: </span>
                    <a className="value" href={move.VideoURL}></a>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        )
    }
}