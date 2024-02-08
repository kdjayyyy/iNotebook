import React from 'react';
import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {

  const s1 = {
    name: "Jolly",
    class: '5C'
  }

  const [state, setState] = useState(s1);

  const update = () => {
    setTimeout(() => {
      setState({
        name: "Larry",
        class: '10C'
      })
    }, 1000)
  }

  return (
    // the value parameter is the state or the data that has to be made available across the components of the react component tree
    <NoteContext.Provider value={{state, update}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
