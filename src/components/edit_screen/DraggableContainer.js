import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rnd } from 'react-rnd';

class DraggableContainer extends React.Component {

    render() {
        return (
            <Rnd default={{
                x: 0,
                y: 0,
                width: 320,
                height: 200,
              }}
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#000000",
                borderRadius: 10,
                borderWidth: 1,
              }}
              bounds="parent"
            >
            </Rnd>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframeItems,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(DraggableContainer);