import React from "react";

import { Container, LoaderBox, ErrorContainer } from "./styles";
import Loader from "../Loader";
import Button from "app/styles/Button";

interface Props {
  className?: string;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  errorControlOnClick?: () => void;
  loaderContainerClassName?: string;
}
const LoaderContainer: React.FC<Props> = (props) => {
  const {
    className,
    loading,
    error,
    errorMessage = "Network Error",
    loaderContainerClassName,
    errorControlOnClick,
  } = props;
  return (
    <Container className={className}>
      {loading && (
        <LoaderBox className={loaderContainerClassName}>
          <Loader className="loader" size="60" strokeWidth="2" />
        </LoaderBox>
      )}
      {!loading && error && (
        <ErrorContainer>
          <p className="text-18 error-message">{errorMessage}</p>
          <Button onClick={errorControlOnClick}>Try Again</Button>
        </ErrorContainer>
      )}
      {!loading && !error && <>{props.children}</>}
    </Container>
  );
};

export default LoaderContainer;
