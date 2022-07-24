//NoteState from context/notes folder used for Context Api 
import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const notesInitial = [ ]
    const [notes, setNotes] = useState(notesInitial)


    //Get All Note
    const getNotes = async () => {
        //Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json)
    }


    //Add a Note
    //arrow function that push the note and update setnotes, it takes title, desc, tag and date automatically gemerate
    const addNote = async (title, description, tag) => {
        //Api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        // const note = {
        //     "_id": "62d447a10d3563add3f2891c",
        //     "user": "62d3db177b9a66293627cbd0",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2022-07-17T17:32:17.299Z",
        //     "__v": 0
        // };
        //setNotes(notes.push(note))
    }



    //Delete a Note     
    //arrow function that take an id
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();        
        console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }



    //Edit - update a Note
    //arrow function that take an id
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json)


        let newNotes = JSON.parse(JSON.stringify(notes)) //it makes deep copy

        //Logic to edi a note in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        //Context provider that teake values 
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;



// const NoteState = (props) => {
//     //this function of state s1 for other components to use it
//     const s1 = {
//         "name": "Atif",
//         "class": "bse"
//     }
//     //useState to update the state(s1)
//     const [state, setState] = useState(s1);
//     //update function  change the state afte 1 sec
//     const update = ()=> {
//         setTimeout(() => {
//             setState({
//                 "name": "Atif - updated",
//                 "class": "bse - updated"
//             })
//         }, 1000);
//     }
//     return (
//         //this is a simple syntax which takes a value of state function & accessible to all children components
//         <NoteContext.Provider value={{state, update}}>
//             {props.children}
//         </NoteContext.Provider>
//     )
// }

