import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';
// import NoteState from '../context/notes/NoteState';

const About = () => {

  const contextData = useContext(NoteContext);
  
  useEffect(() => {
    if(contextData && contextData.state)
      contextData.update();
  }, [contextData]);

  return (
    <>
      {contextData && contextData.state && (
        <p>This is about {contextData.state.name} and he is from class {contextData.state.class}</p>    
      )}
    </>
  )
}

export default About;
