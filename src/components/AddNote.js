import React, { useState, useContext } from 'react';
import noteContext from '../Context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "#" });

    const handleClick = (e) => {
        e.preventDefault();  // Prevent default form submission
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "#" });  // Clear form after submission
        props.showAlert('Updated Successfully', 'success')
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className='container py-4'>
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">TITLE:</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">DESCRIPTION:</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={10} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">TAG:</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
                <button disabled={note.title.length < 5 || note.description < 10} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;
