import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { CitiesSection } from "../styles";
import CityWeather from "app/components/CityWeather";
import { CitiesStoreContext } from "app/store/cities";
import { cityIsFavourite } from "app/utils/city";
import useCityActions from "../hooks/useCityActions";
import Button from "app/styles/Button";

export const Cities: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode((m) => !m);

  const { favourites, cities } = useContext(CitiesStoreContext);

  const { onFavouriteClicked, onRemovedClicked } = useCityActions();

  const cityKeys = Object.keys(cities);
  cityKeys.sort();

  return (
    <>
      <h1 className="section-title">
        <span>Cities</span>
        <Button type="button" onClick={toggleEditMode}>
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </h1>
      <CitiesSection data-testid="cities">
        {cityKeys.map((key) => {
          const city = cities[key];
          return (
            <Link key={key} className="city-link" to={`/city?id=${key}`}>
              <CityWeather
                city={city}
                showRemoveButton={editMode}
                isFavourite={cityIsFavourite(city, favourites)}
                onFavouriteClicked={onFavouriteClicked}
                onRemoveClicked={onRemovedClicked}
              />
            </Link>
          );
        })}
        {cityKeys.map((key) => {
          const city = cities[key];
          return (
            <Link key={key} className="city-link" to={`/city?id=${key}`}>
              <CityWeather
                city={city}
                showRemoveButton={editMode}
                isFavourite={cityIsFavourite(city, favourites)}
                onFavouriteClicked={onFavouriteClicked}
                onRemoveClicked={onRemovedClicked}
              />
            </Link>
          );
        })}
      </CitiesSection>
    </>
  );
};

export default Cities;
