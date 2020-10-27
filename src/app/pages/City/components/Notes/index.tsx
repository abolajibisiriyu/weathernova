import React from "react";

import NoteItem from "../NoteItem";
import { NoteItems, NotesContainer } from "./styles";
import Textarea from "app/styles/Textarea";
import { useNotes } from "./hooks/useNotes";
import { City } from "app/store/cities/types";

interface Props {
  city: City;
}
const Notes: React.FC<Props> = (props) => {
  const { city } = props;

  const {
    onAddNote,
    handleNoteTextChange,
    noteText,
    notes,
    onRemoveNote,
    onEditNote
  } = useNotes(city.id);

  return (
    <NotesContainer>
      <h1>Notes</h1>
      <NoteItems data-testid="note-items">
        {notes &&
          Object.keys(notes).map((noteId) => (
            <NoteItem
              key={noteId}
              note={notes[noteId]}
              onRemoveNote={onRemoveNote}
              onEditNote={onEditNote}
            />
          ))}
      </NoteItems>
      <form onSubmit={onAddNote} data-testid="notes-form">
        <Textarea
          cols={50}
          rows={5}
          placeholder="Add a note ... (200 characters max)"
          maxLength={200}
          value={noteText}
          onChange={handleNoteTextChange}
        />
        <button type="submit">Add Note</button>
      </form>
    </NotesContainer>
  );
};
export default Notes;
