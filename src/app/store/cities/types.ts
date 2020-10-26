import createActionType from "../util/createActionType";

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface DailyWeather {
  dt: number;
  temp: { day: number };
  weather: Weather[];
}
export interface CurrentWeather extends Omit<DailyWeather, "temp"> {
  temp: number;
}
export interface City {
  id: string;
  lat: number;
  lon: number;
  current: CurrentWeather;
  daily: DailyWeather[];
  name: string;
  country: string;
}
export interface RequestState {
  pending: boolean;
  success: boolean;
  error: string | null;
}
export interface CitiesState {
  cities: {
    [key: string]: City;
  };
  favourites: string[];
  citiesRequest: RequestState;
  cityRequest: RequestState;
}

export const fetchCitiesWeatherInfo = createActionType(
  "fetch_cities_weather_info"
);

export const fetchCityWeatherInfo = createActionType(
  "fetch_city_weather_info"
);

export const addCityToFavorites = createActionType("add_city_to_favourite");
export const removeCityFromFavorites = createActionType(
  "remove_city_from_favourite"
);

export const removeCity = createActionType("remove_city");
