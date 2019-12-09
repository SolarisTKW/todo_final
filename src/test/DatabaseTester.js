import React from 'react'
import { connect } from 'react-redux';
import todoJson from './wireframeData.json';
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframeItems').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframeItems').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        let x = new Date();
        console.log(x.getDate());
        todoJson.wireframeItems.forEach(wireframeItem => {
            fireStore.collection('wireframeItems').add({
                    key: wireframeItem.key,
                    name: wireframeItem.name,
                    elements: wireframeItem.elements,
                    time: x.getTime(),
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {
        const { auth, profile } = this.props;
        const admin = profile.admin;
        if (!auth.uid || admin === false) {
            return <Redirect to="/"/>;
        }

        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        firebase: state.firebase,
    };
}

export default connect(mapStateToProps)(DatabaseTester);