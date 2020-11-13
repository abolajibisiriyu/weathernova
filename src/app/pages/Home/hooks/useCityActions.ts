import { useContext, useEffect } from "react";

import { CitiesDispatch, CitiesStoreContext } from "app/store/cities";
import { cityIsFavourite } from "app/utils/city";
import {
  addCityToFavorites,
  City,
  removeCity,
  removeCityFromFavorites,
} from "app/store/cities/types";
import storage from "app/utils/storage";

export default function useCityActions() {
  const dispatch = useContext(CitiesDispatch);
  const { favourites, cities, userLocations } = useContext(CitiesStoreContext);

  const onFavouriteClicked = (city: City) => {
    if (!cityIsFavourite(city, favourites)) {
      dispatch({ type: addCityToFavorites.fulfilled, payload: city.id });
    } else {
      dispatch({ type: removeCityFromFavorites.fulfilled, payload: city.id });
    }
  };

  const onRemovedClicked = (city: City) => {
    dispatch({ type: removeCity.fulfilled, payload: city.id });
  };

  useEffect(() => {
    storage.set("cities", cities);
    storage.set("favourites", favourites);
    storage.set("user_locations", userLocations);
  }, [cities, favourites, userLocations]);

  return { onFavouriteClicked, onRemovedClicked };
}
