import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

// import './move-view.scss';

export class MoveView extends React.Component {
    render() {
        const { move, onBackClick, addToFavorites } = this.props;
        return (
            <Row className="move-view justify-content-md-center">
                <Col md={1}>
                    <div className="move-Poster">
                        <img src={move.ImgURL} />
                    </div>
                </Col>
                <Col>
                    <div className="move-title">
                        <h3 className="value">Move Title: {move.Title}</h3>
                    </div>
                    <div>
                        <Link to={`/styles/${move.Style.Name}`}>
                            <Button variant="link">Style: {move.Style.Name}</Button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/sources/${move.Source.Name}`}>
                            <Button variant="link">Source: {move.Source.Name}</Button>
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
                    <Button variant="primary" type="button" onClick={() => { addToFavorites() }}>Add to favorites</Button>
                    <Button variant="primary" type="button" onClick={() => { onBackClick() }}>Back</Button>
                </Col>
            </Row>
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
    onBackClick: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired
};