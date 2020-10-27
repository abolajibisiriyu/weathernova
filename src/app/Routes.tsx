import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import City from "app/pages/City";
import Home from "app/pages/Home";
import Topnav from "app/components/Topnav";
import ScrollToTop from "./components/ScrollToTop";

export const RouteContent = () => {
  const history = useHistory();

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      var options: PositionOptions = {
        enableHighAccuracy: true,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = position.coords;
          history.push({
            pathname: "/city",
            search: `lat=${coords.latitude}&lon=${coords.longitude}`,
          });
        },
        (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        },
        options
      );
    } else {
      /* geolocation IS NOT available */
    }
  };

  useEffect(() => {
    getUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Topnav />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/city" exact component={City} />
        </Switch>
      </main>
    </div>
  );
};

const Routes: React.FC = (props) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteContent />
    </BrowserRouter>
  );
};

export default Routes;
