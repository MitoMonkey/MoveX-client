import React from 'react';

export class MainView extends React.Component {

    render() {
        return (
            <div className="main-view">
                <div>Inception</div>
                <div>The Shawshank Redemption</div>
                <div>Gladiator</div>
            </div>
        );
    }
}
export default MainView; // without the "default" {} would be required when importing in index.jsx