// import React from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';
import axios from 'axios';
import PropTypes from 'prop-types';

let mapStateToProps = state => { return { user: state.user } }

function AddFavorite(props) {
    const { user, moveID, setUser } = props;
    const favs = user.FavoriteMoves;

    function addMove() {
        if (favs.includes(moveID)) {
            return alert('this move is already in your list of favorites');
        }
        else {
            const token = localStorage.getItem('token');
            axios.post('https://movex-api.onrender.com/users/' + user.Username + '/moves/' + moveID, {}, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    const data = response.data;
                    if (data.FavoriteMoves.toString().length === favs.toString().length) {
                        return console.log('failed to add move in database');
                    }
                    else {

                        localStorage.setItem('user', JSON.stringify(data));
                        setUser(data);
                    }
                })
                .catch(e => {
                    console.log('error adding ' + moveID + ' to user profile ' + user.Username);
                    alert(e);
                });
        }
    }
    return (
        <Button variant="primary" onClick={() => addMove()}>Add favorite</Button >
    )
}

export default connect(mapStateToProps, { setUser })(AddFavorite);

AddFavorite.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.any,
        FavoriteMoves: PropTypes.array.isRequired
    }).isRequired,
    moveID: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired
}