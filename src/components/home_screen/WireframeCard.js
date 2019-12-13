import React from 'react';

class WireframeCard extends React.Component {

    recent = () => {
        this.props.handleRegister(this.props.wireframe.id);
    }

    handleDeleteWireframe = (e) => {
        e.preventDefault();
        this.props.handleDeleteWireframe(this.props.wireframe.id);
    }

    render() {
        return (
            <div className="card z-depth-0 todo-list-link" >
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title" onClick={this.recent} >
                        {this.props.wireframe.name}
                        <i className="material-icons"
                        style={
                            {
                                marginLeft: 10
                            }
                        } 
                        onClick={this.handleDeleteWireframe}>zoom_in</i>
                        </span>
                    
                </div>
            </div>
        );
    }
}
export default WireframeCard;