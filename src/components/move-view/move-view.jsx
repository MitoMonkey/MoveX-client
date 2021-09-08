import React from 'react';
import PropTypes from 'prop-types';

export class MoveView extends React.Component {
    render() {
        const { move, onBackClick } = this.props;
        return (
            <div className="move-view">
                <div className="move-Poster">
                    <img src={move.ImgURL} />
                </div>
                <div className="move-title">
                    <span className="label">Title: </span>
                    <span className="value">{move.Title}</span>
                </div>
                <div className="move-style">
                    <span className="label">Style: </span>
                    <span className="value">{move.Style.Name}</span>
                </div>
                <div className="move-source">
                    <span className="label">Source: </span>
                    <span className="value">{move.Source.Name}</span>
                </div>
                <div className="move-cues">
                    <span className="label">Cues: </span>
                    <span className="value">{move.Cues}</span>
                </div>
                <div className="move-videoLink">
                    <span className="label">Video: </span>
                    <a className="value" href={move.VideoURL}>{move.VideoURL}</a>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        )
    }
}

// validate data types
MoveView.propTypes = {
    move: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Cues: PropTypes.string.isRequired,
        Style: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
        Source: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Weblink: PropTypes.string.isRequired
        }).isRequired,
        VideoURL: PropTypes.string.isRequired,
        ImgURL: PropTypes.string,
        Featured: PropTypes.bool
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};