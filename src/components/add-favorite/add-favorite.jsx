// import React from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { setFavs } from '../../actions/actions';
import axios from 'axios';
import PropTypes from 'prop-types';

let mapStateToProps = state => { return { favs: state.favs, user: state.user } }

function AddFavorite(props) {
    const { favs, user, setFavs, moveID } = props;

    function addMove() {
        if (favs.includes(moveID)) {
            return alert('this move is already in your list of favorites');
        }
        else {
            const token = localStorage.getItem('token');
            axios.post('https://move-x.herokuapp.com/users/' + user + '/moves/' + moveID, {}, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    const data = response.data;
                    // console.log(data);

                    if (data.FavoriteMoves.toString().length === favs.length) {
                        return console.log('failed to add move in database');
                    }
                    else {
                        localStorage.setItem('favs', data.FavoriteMoves.toString());
                        setFavs(data.FavoriteMoves.toString());
                    }
                })
                .catch(e => {
                    console.log('error adding ' + moveID + ' to user profile ' + user);
                    alert(e);
                });
        }
    }
    return (
        <Button variant="primary" onClick={() => addMove()}>Add favorite</Button >
    )
}

export default connect(mapStateToProps, { setFavs })(AddFavorite);

AddFavorite.propTypes = {
    favs: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    setFavs: PropTypes.func.isRequired,
    moveID: PropTypes.string.isRequired
}