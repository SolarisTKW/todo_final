import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';

class WireframeLinks extends React.Component {

    render() {
        const wireframes = this.props.wireframes;
        if(wireframes)
            console.log(wireframes);
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    
                    <Link to={{
                        pathname: '/wireframe/' + wireframe.id,
                        state: {show: false}
                        }}>
                        <WireframeCard 
                            wireframe={wireframe} 
                            handleRegister = {this.props.handleRegister}
                            handleDeleteWireframe = {this.props.handleDeleteWireframe}
                        />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframeItems,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframeLinks);