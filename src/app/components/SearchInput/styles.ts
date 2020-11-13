import styled from "styled-components";

import colors from "app/styles/colors";

export const SearchContainer = styled.form`
  width: 600px;
  display: flex;
  gap: 10px;

  input,
  button {
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const InputBox = styled.div`
  flex-grow: 1;
  height: 50px;

  display: flex;
  align-items: center;

  background-color: ${colors.ANTI_FLASH_WHITE};
  border: 1px solid transparent;
  transition: border 300ms ease-in-out, background-color 300ms ease-in-out;

  position: relative;

  &:focus-within,
  &:active {
    border-color: ${colors.PRESTIGE_BLUE};
    background-color: ${colors.WHITE};

    .clear-btn {
      display: block;
    }
  }
  padding: 0px 30px;

  input {
    flex-grow: 1;
    height: 100%;
    padding: 0px 10px;
    border: none;
    font-size: 1rem;
    background-color: transparent;
    outline: none;
  }

  .prefix,
  .clear-btn {
    position: absolute;
    top: 15px;
    width: 20px;
    height: 20px;
  }

  .prefix {
    left: 10px;
  }
  .clear-btn {
    display: none;
    /* border: 1px solid ${colors.PRESTIGE_BLUE}; */
    border: none;
    outline: none;
    font-weight: 500;
    border-radius: 50%;
    right: 10px;
  }
`;
