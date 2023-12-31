import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
    const host = "http://localhost:8000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    // GEt All Note 
    const getNote = async () => {
        //TODO : API Call
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnote`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authtoken" : localStorage.getItem("token")
                }
        });
        const notes = await response.json();
        setNotes(notes)
    }
    // Add a Note 
    const addNote = async (title, description) => {
        //TODO : API Call
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description }),
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }
    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            }
        });
        const json = await response.json();
        console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }
    // Edit a Note
    const editNote = async (id, title, description) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description }),
        });
        const json = await response.json()
        console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Login to edit in clint
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                break;
            }
        }
        setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{notes , setNotes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}
export default NoteState;