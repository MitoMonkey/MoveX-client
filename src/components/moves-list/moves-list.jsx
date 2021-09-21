import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';

import { MoveCard } from '../move-card/move-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MovesList(props) {
    const { moves, visibilityFilter } = props;
    let filteredMoves = moves;

    if (visibilityFilter !== '') {
        filteredMoves = moves.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!moves) return <div className="main-view">Loading the moves from the database. Check console for errors if it does not finish loading.</div>;

    return (
        <Col>
            <Row className="visibility-filter justify-content-center">
                <Col xs={12} sm={6} lg={4} style={{ margin: '1em' }}>
                    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
                </Col>
            </Row>
            <Row className="moves-list justify-content-center">
                {filteredMoves.map(m => (
                    <Col sm={6} md={4} lg={3} key={m._id}>
                        <MoveCard move={m} />
                    </Col>
                ))}
            </Row>
        </Col>)
}

export default connect(mapStateToProps)(MovesList);