//Note Componenet to show the user's all notes //rafce
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';


const Notes = (props) => {
    //Context API is used to apply a change only in needed component instead of manually
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    
    let history = useHistory();
    
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            history.push("/login") 
        }
        // eslint-disable-next-line
    }, [])

    //useRef Hook used to give a reference to any element
    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        // Manually toggles a modal. Returns to the caller before the modal has actually been shown or hidden (i.e. before the shown.bs.modal or hidden.bs.modal event occurs).
        // ref.toggle();
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        // e.preventDefault();//to not reload a page
        props.showAlert("Updated Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            {/* AddNotes called here to add notes of the user , code in AddNote.js folder */}
            <AddNote showAlert={props.showAlert}/>


            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/*  Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="mb-3 ">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" placeholder="Min 5 Characters" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" placeholder="Min 5 Characters" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" placeholder="Min 5 Characters" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required/>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5 } type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className=" row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No Notes to Display '}
                </div>
                {/* map arrow function show the all resultd of the user by taking related user id*/}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                    //note={note} a prop pass here
                })}
            </div>
        </>
    )
}

export default Notes