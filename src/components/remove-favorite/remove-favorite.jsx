import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { setFavs } from '../../actions/actions';
import axios from 'axios';
import PropTypes from 'prop-types';

let mapStateToProps = state => { return { favs: state.favs, user: state.user } }

function RemoveFavorite(props) {
    const { favs, user, setFavs, moveID } = props;

    function deleteMove() {
        const token = localStorage.getItem('token');
        axios.delete('https://move-x.herokuapp.com/users/' + user + '/moves/' + moveID, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const data = response.data;
                // console.log(data);

                if (data.FavoriteMoves.toString().length === favs.toString().length) {
                    return console.log('failed to delete move in database');
                }

                else {
                    localStorage.setItem('favs', data.FavoriteMoves);
                    setFavs(data.FavoriteMoves);
                }
            })
            .catch(e => {
                console.log('error removing ' + moveID + ' to user profile ' + user);
                alert(e);
            });
    }

    return (
        <Button variant="primary" onClick={() => deleteMove()}>Remove favorite</Button >
    )

}

export default connect(mapStateToProps, { setFavs })(RemoveFavorite);

RemoveFavorite.propTypes = {
    favs: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired,
    setFavs: PropTypes.func.isRequired,
    moveID: PropTypes.string.isRequired
}