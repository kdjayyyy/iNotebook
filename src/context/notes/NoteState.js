import React, { useState } from 'react';
import NoteContext from './NoteContext'
// import { useSyncExternalStore } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);


  // add a note
  const addNote = async (title, description, tag) => {

    // API call logic using fetch API
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NjFmMjQxODZhNDNiYzcxNTVkMDI0In0sImlhdCI6MTcwNDQ4NjMzOH0.ZKs2jvkic-a1JZsRAYQBc7o1CrziHA3Um6M-9tu6EQQ"
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json = response.json();

    // function logic
    const note = {
      "_id": "66029f9b12f662a9f0502abb",
      "user": "65961f24186a43bc7155d024",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-03-26T10:12:43.574Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }


  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NjFmMjQxODZhNDNiYzcxNTVkMDI0In0sImlhdCI6MTcwNDQ4NjMzOH0.ZKs2jvkic-a1JZsRAYQBc7o1CrziHA3Um6M-9tu6EQQ"
      },
    })
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }


  const editNote = async (id, title, description, tag) => {

    // API call logic using fetch API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NjFmMjQxODZhNDNiYzcxNTVkMDI0In0sImlhdCI6MTcwNDQ4NjMzOH0.ZKs2jvkic-a1JZsRAYQBc7o1CrziHA3Um6M-9tu6EQQ"
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json = response.json();

    // function logic
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }


  const deleteNote = async (id) => {

    // API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NjFmMjQxODZhNDNiYzcxNTVkMDI0In0sImlhdCI6MTcwNDQ4NjMzOH0.ZKs2jvkic-a1JZsRAYQBc7o1CrziHA3Um6M-9tu6EQQ"
      }
    });

    const json = response.json();
    console.log(json);
    // console.log(`id of the deleted note is ${id}`)
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  return (
    // the value parameter is the state or the data that has to be made available across the components of the react component tree
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
