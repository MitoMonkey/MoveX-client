import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import AddFavorite from '../add-favorite/add-favorite';
import RemoveFavorite from '../remove-favorite/remove-favorite';

import { Link } from "react-router-dom";

// import './move-card.scss';

let mapStateToProps = state => { return { favs: state.favs } }

function MoveCard(props) {

    const { favs, move } = props;

    return (
        <Card className="Card" >
            <Card.Img variant="top" src={move.ImgURL} />
            <Card.Body>
                <Card.Title>{move.Title}</Card.Title>
                <Card.Text>{move.Cues}</Card.Text>
                <Link to={`/moves/${move._id}`}>
                    <Button variant="primary">View details</Button>
                </Link>
                {(favs.includes(move._id))
                    ? <RemoveFavorite moveID={move._id} />
                    : <AddFavorite moveID={move._id} />
                }
            </Card.Body>
        </Card>
    );
}

export default connect(mapStateToProps)(MoveCard);

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
    }).isRequired,
    // removeFavorite: PropTypes.func.isRequired,
    // addFavorite: PropTypes.func.isRequired,
    favs: PropTypes.string.isRequired
};