import { useContext, useEffect, useState } from "react";

import { NotesDispatch, NotesStoreContext } from "app/store/notes";
import { addNote, editNote, removeNote } from "app/store/notes/types";
import storage from "app/utils/storage";

export function useNotes(cityId: string) {
  const [noteText, setNoteText] = useState("");
  const handleNoteTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNoteText(e.target.value);

  const dispatch = useContext(NotesDispatch);

  const notesStore = useContext(NotesStoreContext);
  const notes = notesStore[cityId];

  const onAddNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!noteText) return;
    dispatch({
      type: addNote.fulfilled,
      payload: { cityId, note: noteText, id: new Date().getTime().toString() },
    });
    setNoteText("");
  };

  const onRemoveNote = (noteId: string) => {
    dispatch({ type: removeNote.fulfilled, payload: { id: noteId, cityId } });
  };

  const onEditNote = ({ noteId, note }: { noteId: string; note: string }) => {
    dispatch({
      type: editNote.fulfilled,
      payload: { id: noteId, cityId, note },
    });
  };

  useEffect(() => {
    storage.set("notes", notesStore);
  }, [notesStore]);

  return {
    onAddNote,
    handleNoteTextChange,
    noteText,
    notes,
    onRemoveNote,
    onEditNote,
  };
}
