import React, { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3 pd-5">
                <div className="card-body d-flex align-items-center justify-content-between">
                    <h5 className="card-title">{note.title}</h5>
                    <div className="d-flex align-items-center">
                        <i className="fa-solid fa-pen-to-square  mx-2" onClick={() => { updateNote(note); }} style={{ fontSize: '24px' }}></i>
                        <i className="fa-regular fa-trash-can  mx-2" onClick={() => { deleteNote(note._id); props.showAlert('Deleted Successfully', 'success') }} style={{ fontSize: '24px' }}></i>
                    </div>
                </div>
                <p className="card-text px-3">{note.description}</p>
                <div className="card-footer text-muted">
                    {note.date}
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
