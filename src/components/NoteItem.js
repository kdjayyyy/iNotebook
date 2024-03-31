import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
   const context = useContext(NoteContext);
   const { deleteNote } = context;
   const { note } = props;
   return (
      <>
         <div className="col-md-3">
            <div className="card">
               <div className="card-body">
                  <div className="d-flex align-items-center">
                     <h5 className="card-title">{note.title}</h5>
                     <i class="fa fa-trash mx-2" onClick={() => {deleteNote(note._id)}}></i>
                     <i class="fa fa-edit mx-2"></i> 
                  </div>
                  <p className="card-text">
                     {note.description}
                  </p>
               </div>
            </div>
         </div>
      </>
   )
}

export default NoteItem;
