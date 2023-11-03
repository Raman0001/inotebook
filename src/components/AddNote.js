import React,{ useState, useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';


const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:""})
    const handleClick =(e)=>{
        e.preventDefault()
        addNote(note.title,note.description)
        setNote({title:"",description:""})
        props.showAlert("Added successfully","success")
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    return (
        <div className="container">
            <h1>Add Notes</h1>
            <form>
                <div className="mb-3 row">
                    <label htmlFor="title" className="col-sm-3 col-form-label"></label>
                    <div className="col-sm-15">
                        <input type="text"  className="form-control" id="title" name='title' value={note.title} placeholder="Title" onChange={onChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="description"  className="col-sm-3 col-form-label"></label>
                    <div className="col-sm-15">
                        <input type="text" className="form-control" id="description" name='description' value={note.description} placeholder="Description" onChange={onChange} />
                    </div>
                    <div className="my-4">
                        <button type='submit' className='btn btn-dark' onClick={handleClick}>Add Note</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddNote
