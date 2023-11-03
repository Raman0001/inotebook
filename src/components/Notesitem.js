import React,{useContext} from 'react'
import notesContext from '../context/notes/NoteContext';

const Notesitem = (props) => {
    const context = useContext(notesContext)
    const { deleteNote } = context;
    const { note,updateNote } = props;
    return (
        <div className="col-md-3 my-2 rounded-4">
            <div className="card border border-primary">
                <div className="card-body "><h5>{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
                props.showAlert("Deleted Successfully","secondary")}}></i>

                </div>
            </div>
        </div>
    )
}

export default Notesitem
