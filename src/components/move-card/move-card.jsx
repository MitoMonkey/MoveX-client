import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './move-card.scss';

export class MoveCard extends React.Component {
    render() {
        // const { moveData } = this.props; = short for this.props.moveData, retrieving the parameter from main-view > moves.map() 
        const { moveData, onMoveClick } = this.props;

        return (
            // <div className="move-card" onClick={() => { onMoveClick(moveData); }}>{moveData.Title}</div>;
            <Card>
                <Card.Img variant="top" src={moveData.ImgURL} />
                <Card.Body>
                    <Card.Title>{moveData.Title}</Card.Title>
                    <Card.Text>{moveData.Cues}</Card.Text>
                    <Button variant="primary" onClick={() => onMoveClick(moveData)} >Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

// validate data types
MoveCard.propTypes = {
    moveData: PropTypes.shape({
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
    onMoveClick: PropTypes.func.isRequired
};