import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { MoveCard } from '../move-card/move-card';

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

    return filteredMoves.map(m => (
        <Col sm={6} md={4} lg={3} key={m._id}>
            <MoveCard move={m} />
        </Col>
    ));
}

export default connect(mapStateToProps)(MovesList);