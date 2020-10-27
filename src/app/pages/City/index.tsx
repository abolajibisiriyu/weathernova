import React, { useCallback } from "react";
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

  const { city, cityIsFavourite, fetchCity, error, pending } = useCity({
    cityId,
    coords: { lon, lat },
  });

  const _fetchCity = useCallback(() => {
    if (city) fetchCity(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <LoaderContainer
      loading={pending}
      error={!!error && !city}
      errorControlOnClick={_fetchCity}
    >
      <CityContainer>
        {/* <Button as={Link} to="" className="clear back-btn">
          Back to cities
        </Button> */}
        {city && (
          <>
            <WeatherInfo>
              <CityWeather
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
