import React, { useState } from "react";

import GlobalStyle from "./styles";
import Routes from "./Routes";
import CitiesStore from "./store/cities";
import useLoadScript from "./hooks/useLoadScript";
import LoaderContainer from "./components/LoaderContainer";

function App() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useLoadScript({
    url: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}=&libraries=places`,

    onLoad: () => {
      setScriptLoaded(true);
    },
  });
  return (
    <>
      <GlobalStyle />
      <LoaderContainer loading={!scriptLoaded} className="main-loader">
        <CitiesStore>
          <Routes />
        </CitiesStore>
      </LoaderContainer>
    </>
  );
}

export default App;
