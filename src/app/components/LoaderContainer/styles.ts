import styled from "styled-components";

import Colors from "app/styles/colors";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const LoaderBox = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
  .error-message {
    margin: 24px 0px 42px;
    color: ${Colors.PRESTIGE_BLUE};
    width: 360px;
    text-align: center;
    max-width: 100%;
  }
`;
