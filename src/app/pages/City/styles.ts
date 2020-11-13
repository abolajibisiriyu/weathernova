import styled from "styled-components";

import colors from "app/styles/colors";
import media from "app/styles/media";

export const CityContainer = styled.section`
  overflow-x: hidden;
  .back-btn {
    display: inline-block;
    margin-bottom: 20px;

    text-decoration: none;
  }
`;

export const WeatherInfo = styled.section`
  display: flex;
  gap: 20px;

  & > .city-weather {
    gap: 15px;
  }

  ${media.tablet`
    flex-wrap: wrap;
    .city-weather {
      width: 100%;
    }
  `};
`;

export const DailyData = styled.div`
  flex-grow: 1;
  border: 1px solid ${colors.PEACE};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  .row {
    flex-grow: 1;
    display: flex;
    gap: 25px;
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.PEACE};
    }
  }
  .data {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    .icon {
      width: 50px;
      height: 50px;
      margin-bottom: 5px;
    }
    .description {
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .temperature {
      display: flex;
      align-items: flex-start;
      gap: 5px;
      margin-bottom: 5px;

      & > svg {
        width: 20px;
        height: 20px;

        /* position: absolute;
        top: 0; */
      }
    }
  }

  ${media.tablet`
    .row {
      flex-wrap: wrap;
    }
    .data {
      width: 100%;
    }
  `};
`;
