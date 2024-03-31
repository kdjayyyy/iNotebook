import React, { useContext, useEffect } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import NoteContext from '../context/notes/NoteContext';

const Notes = () => {
   const context = useContext(NoteContext);
   const { notes, getNotes } = context;
   useEffect(() => {
      getNotes()
   }, []);
   return (
      <>
         <AddNote/>
         
         <div className="row my-3">
            <h2 className="my-3">
               Your Notes
            </h2>
            {
               notes.map((note) => {
                  return <NoteItem key={note._id} note={note} />;
               })
            }
         </div>

      </>
   )
}

export default Notes;


