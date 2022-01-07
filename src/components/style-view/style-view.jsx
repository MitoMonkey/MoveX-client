import React from 'react';
import PropTypes from 'prop-types';

import MoveCard from '../move-card/move-card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// import './style-view.scss';

export class StyleView extends React.Component {
    render() {
        const { moves, style, onBackClick } = this.props;

        // make sure the path to the image is correct
        moves.forEach(m => {
            if (!m.ImgURL.includes('..')) {
                m.ImgURL = '.' + m.ImgURL;
            }
        });

        return (
            <>
                <Row className="justify-content-center text-center">
                    <Col md={8}>
                        <h3>Style Details</h3>
                        <div className="style-name">
                            <strong><span className="label">Style name: </span>
                                <span>{style.Name}</span></strong>
                        </div>
                        <div className="style-description">
                            <span className="value">{style.Description}</span>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center text-center">
                    <Col>
                        <h4 className="style-moves">All moves in this style</h4>
                        <CardGroup className="justify-content-md-center">
                            {moves.map(m => (
                                <Col sm={6} md={4} lg={3} key={m._id}>
                                    <MoveCard move={m} />
                                </Col>
                            ))}
                        </CardGroup>
                    </Col>
                </Row>
            </>
        )
    }
}

// let mapStateToProps = state => { return { moves: state.moves } }
// export default connect(mapStateToProps)(StyleView);

// validate data types
// "moves" is not validated here, because it was already validated in MoveView
StyleView.propTypes = {
    style: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};