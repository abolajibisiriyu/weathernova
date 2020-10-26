import React, { useReducer } from "react";

import notesReducer, { hydrate, INITIAL_STATE } from "./reducer";
import { NotesState } from "./types";

export const NotesDispatch = React.createContext<
  React.Dispatch<{ type: string; payload?: any }>
>(() => {});
NotesDispatch.displayName = "NotesDispatch";

export const NotesStoreContext = React.createContext<NotesState>(INITIAL_STATE);
NotesStoreContext.displayName = "NotesStoreContext";

const NoteStore: React.FC = (props) => {
  const [notes, dispatch] = useReducer(notesReducer, INITIAL_STATE, hydrate);

  return (
    <NotesStoreContext.Provider value={notes}>
      <NotesDispatch.Provider value={dispatch}>
        {props.children}
      </NotesDispatch.Provider>
    </NotesStoreContext.Provider>
  );
};

export default NoteStore;
