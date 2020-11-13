import React, { useContext, useEffect } from "react";

import LoaderContainer from "app/components/LoaderContainer";
import { CitiesStoreContext } from "app/store/cities";

import Cities from "./components/Cities";
import FavouriteCities from "./components/FavouriteCities";
import useCities from "./hooks/useCities";
import { HomeContainer } from "./styles";
import UserCities from "./components/UserCities";

function Home() {
  const { fetchCitiesWeather, pending, error } = useCities();
  const { cities } = useContext(CitiesStoreContext);

  useEffect(() => {
    fetchCitiesWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoaderContainer
      loading={pending}
      error={!!error && !Object.keys(cities).length}
      errorControlOnClick={fetchCitiesWeather}
    >
      <HomeContainer>
        <UserCities />
        <FavouriteCities />
        <Cities />
      </HomeContainer>
    </LoaderContainer>
  );
}

export default Home;
