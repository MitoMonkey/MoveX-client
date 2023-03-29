import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';
import axios from 'axios';
import PropTypes from 'prop-types';

let mapStateToProps = state => { return { user: state.user } }

function RemoveFavorite(props) {
    const { user, setUser, moveID } = props;
    const favs = user.FavoriteMoves;

    function deleteMove() {
        const token = localStorage.getItem('token');
        axios.delete('https://movex-api.onrender.com/users/' + user.Username + '/moves/' + moveID, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const data = response.data;

                if (data.FavoriteMoves.toString().length === favs.toString().length) {
                    return console.log('failed to delete move in database');
                }
                else {
                    localStorage.setItem('user', JSON.stringify(data));
                    setUser(data);
                }
            })
            .catch(e => {
                console.log('error removing ' + moveID + ' to user profile ' + user.Username);
                alert(e);
            });
    }

    return (
        <Button variant="primary" onClick={() => deleteMove()}>Remove favorite</Button >
    )

}

export default connect(mapStateToProps, { setUser })(RemoveFavorite);

RemoveFavorite.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.any,
        FavoriteMoves: PropTypes.array.isRequired
    }).isRequired,
    setUser: PropTypes.func.isRequired,
    moveID: PropTypes.string.isRequired
}