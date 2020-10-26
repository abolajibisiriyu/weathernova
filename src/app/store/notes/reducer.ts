import storage from "app/utils/storage";
import { addNote, editNote, NotesState, removeNote } from "./types";

export const INITIAL_STATE: NotesState = {
  ...storage.get("notes"),
};

const notesReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case addNote.fulfilled:
      return {
        ...state,
        [action.payload.cityId]: {
          ...state[action.payload.cityId],
          [action.payload.id]: action.payload,
        },
      };
    case removeNote.fulfilled: {
      const { [action.payload.id]: remoedNote, ...otherNotes } = state[
        action.payload.cityId
      ];
      return { ...state, [action.payload.cityId]: otherNotes };
    }
    case editNote.fulfilled:
      return {
        ...state,
        [action.payload.cityId]: {
          ...state[action.payload.cityId],
          [action.payload.id]: {
            ...state[action.payload.cityId][action.payload.id],
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};

export function hydrate(initialState: NotesState) {
  return {
    ...initialState,
    ...storage.get("notes"),
  };
}

export default notesReducer;
