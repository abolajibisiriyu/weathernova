import styled from "styled-components";

import colors from "./colors";

const Button = styled.button`
  border: none;
  outline: none;
  color: ${colors.SATURATED_SKY};
  background-color: ${colors.ANTI_FLASH_WHITE};
  text-transform: uppercase;
  font-weight: bold;
  padding: 5px;
  &.danger {
    color: ${colors.TOMATO};
  }
`;

export default Button;
