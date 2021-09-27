// import React from 'react';
import { connect } from 'react-redux';
import { addFav } from '../../actions/actions';

function AddFavorite(moveID) {
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

                this.props.addFav(moveID); // dispatch action to update the state

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

let mapStateToProps = state => { return { favs: state.favs } } // retrieve the relevant state from the store (= a "selector" hook) via the connect(mapStateToProps) function
export default connect(mapStateToProps, { addFav })(AddFavorite);