import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// import { Link } from "react-router-dom";

// import './source-view.scss';

export class SourceView extends React.Component {
    render() {
        const { source, onBackClick } = this.props;
        return (
            <Row className="source-view justify-content-md-center">
                <Col>
                    <div className="source-name">
                        <h3 className="value">Source Name: {source.Name}</h3>
                    </div>
                    <div className="source-weblink">
                        <a href={source.Weblink} target="_blank">Weblink: {source.Weblink}</a>
                    </div>
                    { /* missing: list of all moves from this source */}
                    <Button variant="primary" type="button" onClick={() => { onBackClick(); }}>Back</Button>
                </Col>
            </Row>
        )
    }
}

// validate data types
SourceView.propTypes = {
    source: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Weblink: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};