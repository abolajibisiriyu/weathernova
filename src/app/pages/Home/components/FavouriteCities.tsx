import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CitiesSection } from "../styles";
import CityWeather from "app/components/CityWeather";
import { CitiesStoreContext } from "app/store/cities";
import { cityIsFavourite } from "app/utils/city";
import useCityActions from "../hooks/useCityActions";

export const FavouriteCities: React.FC = (props) => {
  const { favourites: _f, cities } = useContext(CitiesStoreContext);
  const favourites = _f.slice();
  favourites.sort();

  const { onFavouriteClicked } = useCityActions();

  return (
    <>
      <h1>Favourite Cities</h1>
      {favourites.length === 0 && (
        <h4>
          You have no favourite city(s), click the star icon to add a city
        </h4>
      )}
      <CitiesSection>
        {favourites.map((favourite) => (
          <Link className="city-link" key={favourite} to={`/city?id=${favourite}`}>
            <CityWeather
              city={cities[favourite]}
              isFavourite={cityIsFavourite(cities[favourite], favourites)}
              onFavouriteClicked={onFavouriteClicked}
            />
          </Link>
        ))}
      </CitiesSection>
    </>
  );
};

export default FavouriteCities;
