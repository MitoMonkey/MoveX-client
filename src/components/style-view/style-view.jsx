import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

// import './style-view.scss';

export class StyleView extends React.Component {
    render() {
        const { style, onBackClick } = this.props;
        return (
            <Row className="style-view justify-content-md-center">
                <Col>
                    <div className="style-title">
                        <h3 className="value">Style Name: {style.Name}</h3>
                    </div>
                    <div className="style-description">
                        <span className="label">Description: </span>
                        <span className="value">{style.Description}</span>
                    </div>
                    { /* missing: list of all moves from this style */}
                    <Button variant="primary" type="button" onClick={() => { onBackClick(); }}>Back</Button>
                </Col>
            </Row>
        )
    }
}

// validate data types
StyleView.propTypes = {
    style: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};