//rafce
import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    //Context API is used to apply a change only in needed component instead of manually
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag:""})

    const handleAddClick = (e) => {
        e.preventDefault();//to not reload a page
        addNote(note.title, note.description, note.tag );
        setNote({title: "", description: "", tag:""})
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            {/* Add a Note form, simple bootstap card used */}
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3 ">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" placeholder="Min 5 Characters" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description"  className="form-label">Description</label>
                        <input type="text" placeholder="Min 5 Characters" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" placeholder="Min 5 Characters" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
                    </div>

                    <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleAddClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote