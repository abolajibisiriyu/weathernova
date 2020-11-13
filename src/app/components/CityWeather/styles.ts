import styled from "styled-components";

import colors from "app/styles/colors";
import media from "app/styles/media";

export const CityBox = styled.div`
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: space-between;
  gap: 15px;

  min-height: 200px;

  border: 1px solid ${colors.PEACE};
  border-radius: 2px;

  position: relative;

  .temperature {
    position: relative;

    font-size: 6rem;

    & > svg {
      width: 30px;
      height: 30px;

      position: absolute;
      top: 0;
    }
  }
  .city {
    text-transform: uppercase;
  }
  .icon {
    width: 100px;
    height: 100px;
  }
  .description {
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 20px;
    font-weight: 500;
  }
  button {
    border: none;
    background-color: transparent;
    outline: none;
    & > svg {
      width: 30px;
      height: 30px;
      &.favourite {
        & > path:nth-child(1),
        & > path:nth-child(2) {
          fill: #2ed573;
        }
      }
    }
  }
  button.favourite {
    align-self: flex-start;
    margin-top: 10px;
  }

  button.remove {
    position: absolute;
    top: 10px;
    left: 10px;
    display: none;
    z-index: 1;

    &.show {
      display: block;
    }
  }

  .date {
    border-top: 1px solid ${colors.PEACE};
    padding-top: 10px;
    padding-left: 10px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    padding: 20px;

    &:first-child {
      flex-grow: 1;
    }

    &:last-child {
      border-left: 1px solid ${colors.PEACE};
      padding-left: 0px;
      /* margin-left: 10px; */
    }
  }

  ${media.mobile`
    .temperature {
        font-size: 3rem;
      }
      .city {
        font-size: 0.9rem;
      }
      .icon {
        width: 80px;
        height: 80px;
      }
      .description {
        font-size: 0.7rem;
      }
      .date {
        & > :last-child {
          font-size: 1.1rem;
        }
      }
  `};
`;
