import React from 'react';
import NoteContext from './NoteContext';
import { useState } from 'react';
import { useSyncExternalStore } from 'react';

const NoteState = (props) => {

  const notes = [
    {
      "_id": "6598696a18486f0cff1aba79",
      "user": "65961f24186a43bc7155d024",
      "title": "Plan",
      "description": "Need to go out with the bois!",
      "tag": "Personal",
      "date": "2024-01-05T20:41:14.500Z",
      "__v": 0
    },
    {
      "_id": "66029f8312f662a9f0502ab9",
      "user": "65961f24186a43bc7155d024",
      "title": "Work",
      "description": "Need to finish this work!",
      "tag": "Personal",
      "date": "2024-03-26T10:12:19.992Z",
      "__v": 0
    },
    {
      "_id": "66029f9b12f662a9f0502abb",
      "user": "65961f24186a43bc7155d024",
      "title": "Family",
      "description": "Need to go on a date with honey!",
      "tag": "Personal",
      "date": "2024-03-26T10:12:43.574Z",
      "__v": 0
    }
  ]

  const [note, setNote] = useState(notes);

  return (
    // the value parameter is the state or the data that has to be made available across the components of the react component tree
    <NoteContext.Provider value={{ notes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
