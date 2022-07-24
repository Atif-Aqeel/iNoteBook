//Noteitem componenet to  show items of the notes like title, date, description, etc...  //rafce
import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {

    const context = useContext(noteContext);
    //destructuring way
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className="col-md-3 my-3">
            {/* {note.title}
                {note.description} */}

            {/* card used here to show items of coomponents */}
            <div className="card" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        {/* bootstrap delete/trash icon used by "font awesome" site,,, and add onclick for argument of deletNote*/}
                        <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);        props.showAlert("Deleted Successfully", "success");}}>Delete</i>

                        {/* bootstrap edit icon used by "font awesome" site */}
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=> {updateNote(note);}}>Edit</i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>

        </div>
    )
}

export default NoteItem
