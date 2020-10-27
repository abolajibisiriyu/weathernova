import React from "react";
import { Link, useLocation } from "react-router-dom";

import CityWeather from "app/components/CityWeather";
import Notes from "./components/Notes";
import { CityContainer, WeatherInfo } from "./styles";
import DailyData from "./components/DailyData";
import { useCity } from "./hooks/useCity";
import NoteStore from "app/store/notes";
import LoaderContainer from "app/components/LoaderContainer";
import Button from "app/styles/Button";

const City: React.FC = (props) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const cityId = queryParams.get("id");
  const lon = parseFloat(queryParams.get("lon") || "");
  const lat = parseFloat(queryParams.get("lat") || "");

  const { city, cityIsFavourite, error, pending, init } = useCity({
    cityId,
    coords: { lon, lat },
  });

  const reInitialize = () => {
    init();
  };

  return (
    <LoaderContainer
      loading={pending}
      error={!!error && !city}
      errorControlOnClick={reInitialize}
    >
      <CityContainer>
        <Button as={Link} to="" className="clear back-btn">
          Back to cities
        </Button>
        {city && (
          <>
            <WeatherInfo>
              <CityWeather
                data-testid="city-weather"
                city={city}
                className="city-weather"
                isFavourite={cityIsFavourite}
              />
              <DailyData city={city} />
            </WeatherInfo>
            <NoteStore>
              <Notes city={city} />
            </NoteStore>
          </>
        )}
      </CityContainer>
    </LoaderContainer>
  );
};

export default City;
