import React, { useEffect, useRef, useState } from "react";

import { NoteEdit, NoteItemContainer, NoteView } from "./styles";
import Textarea from "app/styles/Textarea";
import { Note } from "app/store/notes/types";
import Button from "app/styles/Button";

interface Props {
  note: Note;
  onRemoveNote: (id: string) => void;
  onEditNote: ({ noteId, note }: { noteId: string; note: string }) => void;
}
const NoteItem: React.FC<Props> = (props) => {
  const { note, onRemoveNote, onEditNote } = props;
  const [editing, setEditing] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [initialNoteText, setInitialNoteText] = useState(note.note);
  const [noteText, setNoteText] = useState("");
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNoteText(val);
  };
  const onEditModeTriggered = () => {
    setNoteText(initialNoteText);
    setEditing(true);
  };
  const onNoteSaved = () => {
    if (!noteText) return;
    onEditNote({ noteId: note.id, note: noteText });
    setEditing(false);
  };

  useEffect(() => {
    setInitialNoteText(note.note);
  }, [note]);

  const onDeleteNote = () => {
    onRemoveNote(note.id);
  };

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(
        inputRef.current?.value.length,
        inputRef.current?.value.length
      );
    }
  }, [editing]);

  return (
    <NoteItemContainer>
      <NoteView className={`${editing ? "editing" : ""}`}>
        <p className="note text-18">{initialNoteText}</p>
        <div className="actions">
          <Button onClick={onEditModeTriggered}>Edit</Button>
          <Button className="danger" onClick={onDeleteNote}>
            Delete
          </Button>
        </div>
      </NoteView>
      <NoteEdit className={`${editing ? "editing" : ""}`}>
        <Textarea
          ref={inputRef}
          rows={5}
          placeholder="Add a note ... (200 characters max)"
          maxLength={200}
          value={noteText}
          onChange={handleNoteChange}
        />
        <div className="actions">
          <Button onClick={onNoteSaved}>Save</Button>
          <Button onClick={() => setEditing(false)} className="danger">
            Cancel
          </Button>
        </div>
      </NoteEdit>
    </NoteItemContainer>
  );
};
export default NoteItem;
