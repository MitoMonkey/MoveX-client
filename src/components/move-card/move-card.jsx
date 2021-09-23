import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

// import './move-card.scss';

import { remFav, addFav } from '../../actions/actions';

export class MoveCard extends React.Component {

    removeFavorite(moveID) {
        //see MainView: axios to change data on API .then(response => {props.remFav(move._id)}) // remFav needs to be in connect() mapDispatchToProps
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        axios.delete('https://move-x.herokuapp.com/users/' + user + '/moves/' + moveID, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const data = response.data;
                // console.log(data);
                let favs = this.props.favs;
                let newFavs = null;
                if (data.FavoriteMoves.toString().length === favs.length) {
                    return console.log('failed to delete move in database');
                }
                /* SAME LOGIC IN REDUCERS. HERE ONLY TO SET LOCAL STORAGE > USE applyMiddleware TO COMBINE IT? */
                else {
                    // if it is the only move in the list
                    if (!favs.includes(',')) {
                        newFavs = favs.replace(moveID, '');
                    }
                    // if there are multiple entries and moveID is the first in the list
                    if (favs.indexOf(moveID) === 0 && favs.includes(',')) {
                        newFavs = favs.replace(moveID + ',', '');
                    }
                    // if it is the last move in the list OR anywhere in the middle
                    if (favs.indexOf(moveID) > 0) {
                        newFavs = favs.replace(',' + moveID, '');
                    }

                    localStorage.setItem('favs', newFavs);

                    window.open('/users/' + user, '_self');
                }
            })
            .catch(e => {
                console.log('error removing ' + moveID + ' to user profile ' + user);
                alert(e);
            });
    }

    addFavorite(moveID) {
        //see MainView  axios to change data on API .then change state 
        let favs = this.props.favs;
        if (favs.includes(moveID)) {
            return alert('this move is already in your list of favorites');
        }
        else {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            axios.post('https://move-x.herokuapp.com/users/' + user + '/moves/' + moveID, {}, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    const data = response.data;
                    // console.log(data);

                    /* SAME LOGIC IN REDUCERS. HERE ONLY TO SET LOCAL STORAGE > USE applyMiddleware TO COMBINE IT? */
                    if (favs.length === 0) {
                        let newFavs = favs.concat(moveID);
                        localStorage.setItem('favs', newFavs);
                    }
                    else {
                        let newFavs = favs.concat(',' + moveID);
                        localStorage.setItem('favs', newFavs);
                    }
                    window.open('/users/' + user, '_self');
                })
                .catch(e => {
                    console.log('error adding ' + moveID + ' to user profile ' + user);
                    alert(e);
                });
        }
    }

    render() {
        const { move } = this.props;

        return (
            <Card className="Card" >
                <Card.Img variant="top" src={move.ImgURL} />
                <Card.Body>
                    <Card.Title>{move.Title}</Card.Title>
                    <Card.Text>{move.Cues}</Card.Text>
                    <Link to={`/moves/${move._id}`}>
                        <Button variant="primary">View details</Button>
                    </Link>
                    {(state.favs.includes(move._id))
                        ? <Button variant="primary" onClick={this.removeFavorite(move._id)} >Remove favorite</Button>
                        : <Button variant="primary" onClick={this.addFavorite(move._id)} >Add favorite</Button>
                    }
                </Card.Body>
            </Card>
        );
    }
}

let mapStateToProps = state => { return { user: state.user, favs: state.favs } }
export default connect(mapStateToProps, { setFavs, addFav, remFav })(MoveCard);

/*
// validate data types
MoveCard.propTypes = {
    move: PropTypes.shape({
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
    }).isRequired
};
*/