// import React from 'react';
import { connect } from 'react-redux';
import { remFav } from '../../actions/actions';

function RemoveFavorite(moveID) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.delete('https://move-x.herokuapp.com/users/' + user + '/moves/' + moveID, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
            const data = response.data;
            // console.log(data);

            this.props.remFav(moveID); // dispatch action to update the state

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

let mapStateToProps = state => { return { favs: state.favs } } // retrieve the relevant state from the store (= a "selector" hook) via the connect(mapStateToProps) function
export default connect(mapStateToProps, { remFav })(RemoveFavorite);