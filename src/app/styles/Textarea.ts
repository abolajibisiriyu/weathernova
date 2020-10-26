import styled from "styled-components";

import colors from "./colors";

const Textarea = styled.textarea`
  border: none;
  font-size: 0.9rem;
  background-color: ${colors.ANTI_FLASH_WHITE};
  outline: none;
  padding: 10px;

  border: 1px solid transparent;
  transition: border 300ms ease-in-out, background-color 300ms ease-in-out;

  resize: none;

  &:focus {
    border-color: ${colors.PRESTIGE_BLUE};
    background-color: ${colors.WHITE};
  }
`;

export default Textarea;
