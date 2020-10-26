import styled from "styled-components";

export const NoteItemContainer = styled.section`
  &:not(:first-child) {
    margin-top: 10px;
  }
  .actions {
    margin-top: 5px;
    display: flex;
    gap: 5px;
  }
`;

export const NoteView = styled.div`
  &.editing {
    display: none;
  }
  p.note {
    width: 480px;
    max-width: 100%;
  }
`;

export const NoteEdit = styled.div`
  display: none;
  &.editing {
    display: block;
  }
  textarea {
    width: 480px;
    max-width: 100%;
    font-size: 0.9rem;
    resize: none;
  }
`;
