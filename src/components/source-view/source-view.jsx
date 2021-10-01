import React from 'react';
import PropTypes from 'prop-types';

import MoveCard from '../move-card/move-card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// import './source-view.scss';

export class SourceView extends React.Component {
    render() {
        const { moves, source, onBackClick } = this.props;
        return (
            <>
                <Row className="justify-content-center text-center">
                    <Col md={8}>
                        <h3>Source details</h3>
                        <div className="source-name">
                            <strong><span className="label">Source name: </span>
                                <span className="value">{source.Name}</span>
                            </strong>
                        </div>
                        <div className="source-weblink">
                            <span className="label">Weblink: </span>
                            <a className="value" href={source.Weblink} target="_blank">{source.Weblink}</a>
                        </div>

                    </Col>
                </Row>
                <Row className="justify-content-center text-center">
                    <Col>
                        <h4 className="source-moves">All moves from this source</h4>
                        <CardGroup className="justify-content-md-center">
                            {moves.map(m => (
                                <Col sm={6} md={4} lg={3} key={m._id}>
                                    <MoveCard
                                        move={m}
                                    />
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
// export default connect(mapStateToProps)(SourceView);

/* validate data types */
// "moves" is not validated here, because it was already validated in MoveView
SourceView.propTypes = {
    source: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Weblink: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};