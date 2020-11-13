import styled from "styled-components";

import media from "app/styles/media";

export const HomeContainer = styled.section`
  width: 100%;
  height: 100%;

  .section-title {
    display: flex;
    gap: 20px;
  }

  & > h4 {
    margin-top: 20px;
    font-weight: normal;
  }
`;

export const CitiesSection = styled.section`
  margin-top: 20px;
  padding-bottom: 40px;

  /* display: flex;
  flex-wrap: wrap;
  gap: 40px; */
  display: grid;
  /* grid-template-columns: auto auto; */
  grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
  grid-gap: 40px;

  & > a.city-link {
    text-decoration: none;
    color: inherit;
  }

  ${media.mobile`
    grid-template-columns:auto;
    overflow-x: hidden;
    & > a.city-link {
      & > * {
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
      }
    }
  `};
`;
