import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { CitiesStoreContext, CitiesDispatch } from "app/store/cities";
import api from "app/api";
import { addUserCity, City, fetchCityWeatherInfo } from "app/store/cities/types";
import parseError from "app/utils/parseError";
import { cityIsFavourite, generateCityId } from "app/utils/city";
import useUpdateEffect from "app/hooks/useUpdateEffect";
import useIsMountedRef from "app/hooks/useIsMountedRef";
import reverseGeocode from "../utils/reverseGeocode";

interface Props {
  cityId?: string | null;
  coords?: { lat: number; lon: number };
}
export function useCity({ cityId, coords }: Props) {
  const { cities, favourites } = useContext(CitiesStoreContext);
  const dispatch = useContext(CitiesDispatch);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mountedRef = useIsMountedRef();

  const { state: locationState, search } = useLocation<any>();
  const history = useHistory();

  const fetchCity = async (city: City) => {
    try {
      const response = await api.cityService.fetchCityWeather({
        lon: city.lon,
        lat: city.lat,
      });
      const id = generateCityId(
        city.name.toLowerCase(),
        city.country.toLowerCase()
      );
      const payload = {
        ...response.data,
        id,
        name: city.name,
        country: city.country,
      };
      const searchParams = new URLSearchParams(search);
      if (mountedRef.current) {
        dispatch({ type: fetchCityWeatherInfo.fulfilled, payload });
        if(searchParams.has('user_location')){
          dispatch({ type: addUserCity.fulfilled, payload: id });
        }
      }
    } catch (error) {
      const errorMessage = parseError(error);
      if (mountedRef.current) setError(errorMessage);
    } finally {
      if (mountedRef.current) setPending(false);
    }
  };

  const [city, setCity] = useState<City>();
  const [cityIsFav, setCityIsFav] = useState(false);

  const init = async () => {
    if (cityId) {
      if (cities[cityId]) {
        const _city = cities[cityId];
        setCity(_city);
        setCityIsFav(cityIsFavourite(_city, favourites));
        fetchCity(_city);
      } else if (cityId && locationState) {
        const tempCity = { ...locationState };
        setPending(true);
        fetchCity(tempCity);
      } else {
        history.push("/");
      }
    } else {
      if (coords && coords.lat && coords.lon) {
        setPending(true);
        try {
          const result: any = await reverseGeocode(coords as any);
          const tempCity = {
            name: result.city,
            country: result.country,
            ...coords,
          };
          const { name, country, lat, lon } = tempCity;
          const searchParams = new URLSearchParams(search);
          searchParams.set("id", generateCityId(name, country));
          searchParams.set("lat", lat.toString());
          searchParams.set("lon", lon.toString());
          history.push({
            pathname: "/city",
            search: searchParams.toString(),
            state: tempCity,
          });
        } catch (error) {
          history.push("/");
        }
      } else {
        history.push("/");
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    init();

    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId, coords?.lat, coords?.lon]);

  useUpdateEffect(() => {
    if (cityId) {
      const _city = cities[cityId];
      if (_city) {
        setCity(_city);
        setCityIsFav(cityIsFavourite(_city, favourites));
      }
    }
  }, [cities, cityId]);

  return { city, cityIsFavourite: cityIsFav, init, pending, error };
}
