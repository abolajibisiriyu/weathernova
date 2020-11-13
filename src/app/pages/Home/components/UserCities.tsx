import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CitiesSection } from "../styles";
import CityWeather from "app/components/CityWeather";
import { CitiesStoreContext } from "app/store/cities";
import { cityIsFavourite } from "app/utils/city";
import useCityActions from "../hooks/useCityActions";

export const UserCities: React.FC = (props) => {
  const { userLocations: _u, cities, favourites } = useContext(
    CitiesStoreContext
  );
  const userLocations = _u.slice();
  userLocations.sort();

  const { onFavouriteClicked } = useCityActions();

  return (
    <>
      <h1>My Locations</h1>
      {userLocations.length === 0 && (
        <h4>
          Don't know your location, grant location access to save your location
        </h4>
      )}
      <CitiesSection data-testid="favourite-cities">
        {userLocations.map((location) => (
          <Link
            className="city-link"
            key={location}
            to={`/city?id=${location}`}
          >
            <CityWeather
              city={cities[location]}
              isFavourite={cityIsFavourite(cities[location], favourites)}
              onFavouriteClicked={onFavouriteClicked}
            />
          </Link>
        ))}
      </CitiesSection>
    </>
  );
};

export default UserCities;
