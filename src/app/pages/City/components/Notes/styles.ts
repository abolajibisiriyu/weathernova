import styled from "styled-components";

import colors from "app/styles/colors";
import media from "app/styles/media";

export const NotesContainer = styled.section`
  margin-top: 40px;

  padding-bottom: 20px;

  & > form {
    margin-top: 20px;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;

    textarea {
      margin-bottom: 10px;
    }
    button[type="submit"] {
      background-color: ${colors.GRISAILLE};
      color: ${colors.WHITE};
      border: none;
      width: auto;
      padding: 5px 20px;
      font-size: 0.7rem;
      text-transform: uppercase;
      font-weight: 500;
      outline: none;
      border-radius: 2px;
    }
  }

  ${media.tablet`
    textarea {
      width: 100%;
    }
  `};
`;

export const NoteItems = styled.div`
  margin-top: 20px;
`;
