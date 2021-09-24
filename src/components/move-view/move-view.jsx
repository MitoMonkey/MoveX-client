import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

// import './move-view.scss';

export class MoveView extends React.Component {

    render() {
        const { move, onBackClick, favs, addFavorite, removeFavorite } = this.props;
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
                    {(favs.includes(move._id))
                        ? <Button variant="primary" onClick={() => removeFavorite(move._id)} >Remove favorite</Button>
                        : <Button variant="primary" onClick={() => addFavorite(move._id)} >Add favorite</Button>
                    }
                    <Button variant="primary" type="button" onClick={() => { onBackClick() }}>Back</Button>
                </Col>
            </Row>
        )
    }
}

let mapStateToProps = state => { return { favs: state.favs } }
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
    removeFavorite: PropTypes.func.isRequired,
    addFavorite: PropTypes.func.isRequired,
    favs: PropTypes.string.isRequired
};