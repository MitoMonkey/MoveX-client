import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

// import './move-card.scss';

export class MoveCard extends React.Component {

    removeFavorite(move) {
        //see MainView 
    }
    addFavorite(move) {
        //see MainView 
    }

    render() {
        const { move } = this.props;

        return (
            <Card className="Card" >
                <Card.Img variant="top" src={move.ImgURL} />
                <Card.Body>
                    <Card.Title>{move.Title}</Card.Title>
                    <Card.Text>{move.Cues}</Card.Text>
                    <Link to={`/moves/${move._id}`}>
                        <Button variant="primary">View details</Button>
                    </Link>
                    {(state.favs.includes(move._id))
                        ? <Button variant="primary" onClick={() => removeFavorite()} >Remove favorite</Button>
                        : <Button variant="primary" onClick={() => addFavorite()} >Add favorite</Button>
                    }

                    {/*(!removeFavorite) PRE_REDUX APPROACH
                        ? <div></div>
                        : <Button variant="primary" onClick={() => removeFavorite()} >Remove favorite</Button>
                    */}
                </Card.Body>
            </Card>
        );
    }
}

// validate data types
MoveCard.propTypes = {
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
    }).isRequired
};