import React, { useState, useContext, useEffect, useRef } from 'react'
import notesContext from '../context/notes/NoteContext';
import Notesitem from './Notesitem';
import AddNote from './AddNote';
import { useHistory } from 'react-router-dom';
const Notes = (props) => {
  const context = useContext(notesContext)
  let history = useHistory()
  const { notes, getNote, editNote } = context;
  useEffect(() => { 
    if(localStorage.getItem("token")){
      history.push("/")
      getNote();
    }
    else{
      history.push("/login")
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"",etitle: "", edescription: "" })
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id ,etitle:currentNote.title ,edescription:currentNote.description});
  }
  const handleClick = (e) => {
    // console.log("updating",notes)
    e.preventDefault()
    editNote(note.id,note.etitle,note.edescription)
    refClose.current.click();
    props.showAlert("update successfully","primary")
    // addNote(note.title, note.description)
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <div ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 row">
                  <label htmlFor="etitle" className="col-sm-3 col-form-label"></label>
                  <div className="col-sm-15">
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} placeholder="Title" onChange={onChange} />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="edescription" className="col-sm-3 col-form-label"></label>
                  <div className="col-sm-15">
                    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' placeholder="Description" onChange={onChange} />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-dark" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <h1>Your Notes</h1>
        <div className='container mx-2'>
          <b>
        {notes.length === 0 && 'No Notes To Display'}
        </b>
        </div>
        {notes.map((note) => {
          return <Notesitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>
    </>
  )
}


export default Notes
