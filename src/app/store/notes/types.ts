import createActionType from "../util/createActionType";

export interface Note {
  id: string;
  note: string;
}
export interface NotesState {
  [key: string]: {
      [key: string]: Note
  };
}

export const addNote = createActionType(
  "add_note"
);
export const removeNote = createActionType(
  "remove_note"
);
export const editNote = createActionType(
  "edit_note"
);
