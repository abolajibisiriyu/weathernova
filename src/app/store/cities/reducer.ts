import { cityIsFavourite, isUserCity } from "app/utils/city";
import removeArrrayItem from "app/utils/removeArrrayItem";
import storage from "app/utils/storage";
import {
  addCityToFavorites,
  addUserCity,
  CitiesState,
  fetchCitiesWeatherInfo,
  fetchCityWeatherInfo,
  removeCity,
  removeCityFromFavorites,
} from "./types";

export const INITIAL_STATE: CitiesState = {
  cities: { ...storage.get("cities") },
  favourites: storage.get("favourites") || [],
  userLocations: storage.get("user_locations") || [],
  citiesRequest: {
    pending: false,
    success: false,
    error: null,
  },
  cityRequest: {
    pending: false,
    success: false,
    error: null,
  },
};

const citiesReducer = (state = INITIAL_STATE, action: any): CitiesState => {
  switch (action.type) {
    case fetchCitiesWeatherInfo.fulfilled:
      return { ...state, cities: { ...state.cities, ...action.payload } };
    case fetchCityWeatherInfo.fulfilled:
      return {
        ...state,
        cities: { ...state.cities, [action.payload.id]: action.payload },
      };
    case addCityToFavorites.fulfilled:
      if (cityIsFavourite(state.cities[action.payload], state.favourites))
        return state;
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    case removeCityFromFavorites.fulfilled:
      if (!cityIsFavourite(state.cities[action.payload], state.favourites))
        return state;
      const index = state.favourites.indexOf(action.payload);
      return {
        ...state,
        favourites: removeArrrayItem(index, state.favourites),
      };
    case removeCity.fulfilled: {
      const { [action.payload]: removedCity, ...otherCities } = state.cities;
      let favourites = state.favourites.slice();
      if (cityIsFavourite(state.cities[action.payload], favourites)) {
        const index = favourites.indexOf(action.payload);
        favourites = removeArrrayItem(index, state.favourites);
      }
      return {
        ...state,
        cities: otherCities,
        favourites,
      };
    }
    case addUserCity.fulfilled:
      if (!isUserCity(action.payload, state.userLocations)) {
        return {
          ...state,
          userLocations: [...state.userLocations, action.payload],
        };
      }
      return state;

    default:
      return state;
  }
};

export function hydrate(initialState: CitiesState) {
  return {
    ...initialState,
    cities: { ...storage.get("cities") },
    favourites: storage.get("favourites") || [],
  };
}

export default citiesReducer;
