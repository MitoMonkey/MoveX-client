import React from 'react';
import PropTypes from 'prop-types';

import { MoveCard } from '../move-card/move-card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

// import './source-view.scss';

export class SourceView extends React.Component {
    render() {
        const { moves, source, onBackClick } = this.props;
        return (
            <Row className="source-view justify-content-md-center">
                <Col>
                    <div className="source-name">
                        <h3 className="value">Source Name: {source.Name}</h3>
                    </div>
                    <div className="source-weblink">
                        <a href={source.Weblink} target="_blank">Weblink: {source.Weblink}</a>
                    </div>
                    <div>
                        <h4 className="source-moves">All moves from this source</h4>
                        <CardGroup className="justify-content-md-center">
                            {moves.map(m => (
                                <Col key={m._id}>
                                    <MoveCard move={m} />
                                </Col>
                            ))}
                        </CardGroup>
                    </div>
                    <Button variant="primary" type="button" onClick={() => { onBackClick(); }}>Back</Button>{'  '}
                    <Link to={`/`}>
                        <Button variant="primary">Home</Button>
                    </Link>
                </Col>
            </Row>
        )
    }
}

/* validate data types */
// "moves" is not validated here, because it was already validated in MoveView
SourceView.propTypes = {
    source: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Weblink: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};