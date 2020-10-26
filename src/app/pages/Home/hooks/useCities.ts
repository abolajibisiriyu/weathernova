import { useContext, useState } from "react";
import { AxiosResponse } from "axios";

import { CitiesDispatch, CitiesStoreContext } from "app/store/cities";
import citiesData from "../data";
import api from "app/api";
import parseError from "app/utils/parseError";
import { fetchCitiesWeatherInfo } from "app/store/cities/types";
import { generateCityId } from "app/utils/city";
import storage from "app/utils/storage";

export default function useCities() {
  const { cities } = useContext(CitiesStoreContext);
  const dispatch = useContext(CitiesDispatch);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCitiesWeather = async () => {
    if (!Object.keys(cities).length) {
      // fetch default cities
      console.log("here");
      setPending(true);
      const topPopulousCities = citiesData.sort((a, b) =>
        a.Name.localeCompare(b.Name)
      );

      const citiesRequests = topPopulousCities.map((c) =>
        api.cityService.fetchCityWeather({ lon: c.lon, lat: c.lat })
      );

      try {
        const citiesResponse = await Promise.all(citiesRequests);

        const mapCityName = (res: AxiosResponse<any>, i: number) => {
          const data = res.data;
          return {
            ...data,
            name: topPopulousCities[i].Name,
            country: topPopulousCities[i].Country,
          };
        };
        const payload = transformCitiesArray(citiesResponse.map(mapCityName));

        storage.set("cities", payload);
        dispatch({ type: fetchCitiesWeatherInfo.fulfilled, payload });
      } catch (error) {
        const errorMessage = parseError(error);
        setError(errorMessage);
      } finally {
        setPending(false);
      }
    } else {
      // fetch weather info for existing cities
      const cityKeys = Object.keys(cities);
      const citiesRequests = cityKeys.map((c) => {
        const city = cities[c];
        return api.cityService.fetchCityWeather({
          lon: city.lon,
          lat: city.lat,
        });
      });

      try {
        const citiesResponse = await Promise.all(citiesRequests);
        const mapCityName = (res: AxiosResponse<any>, i: number) => {
          const data = res.data;
          return {
            ...data,
            name: cities[cityKeys[i]].name,
            country: cities[cityKeys[i]].country,
          };
        };
        const payload = transformCitiesArray(citiesResponse.map(mapCityName));
        storage.set("cities", payload);
        dispatch({ type: fetchCitiesWeatherInfo.fulfilled, payload });
      } catch (error) {
        const errorMessage = parseError(error);
        setError(errorMessage);
      } finally {
        setPending(false);
      }
    }
  };

  return { fetchCitiesWeather, pending, error };
}

function transformCitiesArray(cities: any[]) {
  const mapCityResponse = (prev: any, curr: any) => {
    const id = generateCityId(
      curr.name.toLowerCase(),
      curr.country.toLowerCase()
    );
    return {
      ...prev,
      [id]: { ...curr, id },
    };
  };
  return cities.reduce(mapCityResponse, {});
}
