import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MoveCard } from '../move-card/move-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
// import AddFavorite from '../add-favorite/add-favorite';
// import RemoveFavorite from '../remove-favorite/remove-favorite';

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
                        <MoveCard
                            move={m}
                        // removeFavorite={(moveId) => RemoveFavorite(moveId)}
                        // addFavorite={(moveId) => AddFavorite(moveId)}
                        />
                    </Col>
                ))}
            </Row>
        </Col>)
}

export default connect(mapStateToProps)(MovesList);

// validate data types
MovesList.propTypes = {
    moves: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired,
    // removeFavorite: PropTypes.func.isRequired,
    // addFavorite: PropTypes.func.isRequired,
    visibilityFilter: PropTypes.string
};