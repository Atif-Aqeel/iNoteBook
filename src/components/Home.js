//Home componenet  //import by command: rafce
import React from 'react'
import Notes from './Notes';

const Home = (props) => {

    //destructuring way of alerts (get showalert from props)
    const {showAlert} = props;

    return (
        <div className="mt-3">
            <h1> iNoteBook </h1>

            {/* Notes called here to show all notes of the user , code in Notes.js folder */}
            <Notes showAlert={showAlert} />

        </div>
    )
}

export default Home;
