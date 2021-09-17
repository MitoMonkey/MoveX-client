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
            <>
                <Row className="justify-content-center text-center">
                    <Col md={8}>
                        <h3 className="value">Source details</h3>
                        <div className="source-name">
                            <span>Source name: </span>
                            <span className="value">{source.Name}</span>
                        </div>
                        <div className="source-weblink">
                            <span>Weblink: </span>
                            <a href={source.Weblink} target="_blank">{source.Weblink}</a>
                        </div>

                    </Col>
                </Row>
                <Row className="justify-content-center text-center">
                    <Col>
                        <h4 className="source-moves">All moves from this source</h4>
                        <CardGroup className="justify-content-md-center">
                            {moves.map(m => (
                                <Col sm={6} md={4} lg={3} key={m._id}>
                                    <MoveCard move={m} />
                                </Col>
                            ))}
                        </CardGroup>
                        <Button variant="primary" type="button" onClick={() => { onBackClick(); }}>Back</Button>{'  '}
                        <Link to={`/`}>
                            <Button variant="primary">Home</Button>
                        </Link>
                    </Col>
                </Row>
            </>
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