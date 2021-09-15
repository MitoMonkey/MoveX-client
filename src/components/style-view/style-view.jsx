import React from 'react';
import PropTypes from 'prop-types';

import { MoveCard } from '../move-card/move-card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

// import './style-view.scss';

export class StyleView extends React.Component {
    render() {
        const { moves, style, onBackClick } = this.props;
        return (
            <Row className="style-view justify-content-md-center">
                <Col>
                    <div className="style-name">
                        <h3 className="value">Style: {style.Name}</h3>
                    </div>
                    <div className="style-description">
                        <span className="label">Style description: </span>
                        <span className="value">{style.Description}</span>
                    </div>
                    <div>
                        <h4 className="style-moves">All moves in this style</h4>
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

// validate data types
// "moves" is not validated here, because it was already validated in MoveView
StyleView.propTypes = {
    style: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};