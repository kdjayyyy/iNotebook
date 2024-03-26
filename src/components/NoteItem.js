import React from 'react'

const NoteItem = (props) => {
   const { note } = props;
   return (
      <>
         <div className="col-md-3">
            <div className="card">
               <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">
                     {/* {note.description} */}
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nam hic exercitationem sequi obcaecati temporibus eaque explicabo dolor quo quod.
                  </p>
                  <div className="d-flex align-items-center">
                     {/* <i class="bi bi-trash mx-2"></i> */}
                     <i class="fa fa-trash mx-2"></i>
                     <i class="fa fa-edit mx-2"></i>
                     {/* <i class="bi bi-pen mx-2"></i> */}
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default NoteItem;
