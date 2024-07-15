import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)


    // Get All Notes
    const getNotes = async () => {
        const headers = {
            'auth-token': localStorage.getItem('token')
        };

        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Add a Note
    const addNote = async (title, description, tag) => {

        // API Call 
        const headers = {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')

        };
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const Data = await response.json();
            console.log(Data)
            const note = Data
            setNotes(notes.concat(note))
        } catch (error) {
            console.error('Error fetching data:', error);

        }



    }
    //Delete a Note 
    const deleteNote = async (id) => {

        // API Call 
        const headers = {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')

        };
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: headers,

            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const Data = await response.json();
            console.log(Data)


        } catch (error) {
            console.error('Error fetching data:', error);

        }

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const headers = {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')

        };
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const Data = await response.json();
            console.log(Data)



        } catch (error) {
            console.error('Error fetching data:', error);

        }

        // Logic To Update Note
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
            }

        }

    }
    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState;