import React from 'react';

class WireframeCard extends React.Component {

    render() {
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title" >{this.props.wireframe.name}</span>
                </div>
            </div>
        );
    }
}
export default WireframeCard;