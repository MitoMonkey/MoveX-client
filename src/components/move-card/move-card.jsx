import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import AddFavorite from '../add-favorite/add-favorite';
import RemoveFavorite from '../remove-favorite/remove-favorite';

import { Link } from "react-router-dom";

// import './move-card.scss';

export class MoveCard extends React.Component {

    render() {
        const { move, favs } = this.props;

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
                        ? <Button variant="primary" onClick={() => RemoveFavorite(move._id)} >Remove favorite</Button>
                        : <Button variant="primary" onClick={() => AddFavorite(move._id)} >Add favorite</Button>
                    }
                </Card.Body>
            </Card>
        );
    }
}

let mapStateToProps = state => { return { favs: state.favs } }
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