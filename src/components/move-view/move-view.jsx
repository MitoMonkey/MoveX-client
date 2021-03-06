import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import AddFavorite from '../add-favorite/add-favorite';
import RemoveFavorite from '../remove-favorite/remove-favorite';

// import './move-view.scss';

let mapStateToProps = state => { return { user: state.user } }

function MoveView(props) {
    const { move, onBackClick, user } = props;
    const favs = user.FavoriteMoves;

    return (
        <Row className="move-view justify-content-center text-center">
            {/*<Col md={1}>
                    <div className="move-Poster">
                        <img src={move.ImgURL} />
                    </div>
                </Col> */}
            <Col sm={12} md={8}>
                <h3>Move details</h3>
                <div className="move-title">
                    <strong><span className="label">Move Title: </span>
                        <span className="value">{move.Title}</span>
                    </strong>
                </div>
                <div className="move-style">
                    <span className="label">Style: </span>
                    <Link to={`/styles/${move.Style.Name}`}>
                        <Button variant="link">{move.Style.Name}</Button>
                    </Link>
                </div>
                <div className="move-source">
                    <span className="label">Source: </span>
                    <Link to={`/sources/${move.Source.Name}`}>
                        <Button variant="link">{move.Source.Name}</Button>
                    </Link>
                </div>
                <div className="move-cues">
                    <span className="label">Cues: </span>
                    <span className="value">{move.Cues}</span>
                </div>
                <div className="move-videoLink">
                    <span className="label">Video: </span>
                    <a className="value" href={move.VideoURL}>{move.VideoURL}</a>
                </div>
                <div>
                    {(favs.includes(move._id))
                        ? <RemoveFavorite moveID={move._id} />
                        : <AddFavorite moveID={move._id} />
                    }                    
                </div>
            </Col>
        </Row>
    )
}

export default connect(mapStateToProps)(MoveView);

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
    onBackClick: PropTypes.func.isRequired,
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.any,
        FavoriteMoves: PropTypes.array.isRequired
    }).isRequired
};