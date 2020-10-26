import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { CitiesStoreContext, CitiesDispatch } from "app/store/cities";
import api from "app/api";
import { City, fetchCityWeatherInfo } from "app/store/cities/types";
import parseError from "app/utils/parseError";
import { cityIsFavourite, generateCityId } from "app/utils/city";
import useUpdateEffect from "app/hooks/useUpdateEffect";

interface Props {
  cityId?: string | null;
  coords?: { lat: number; lon: number };
}
export function useCity({ cityId, coords }: Props) {
  const { cities, favourites } = useContext(CitiesStoreContext);
  const dispatch = useContext(CitiesDispatch);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      dispatch({ type: fetchCityWeatherInfo.fulfilled, payload });
    } catch (error) {
      const errorMessage = parseError(error);
      setError(errorMessage);
    } finally {
      setPending(false);
    }
  };

  const { state: locationState } = useLocation<any>();
  const history = useHistory();

  const [city, setCity] = useState<City>();
  const [cityIsFav, setCityIsFav] = useState(false);

  const init = async () => {
    if (cityId) {
      if (cities[cityId]) {
        const _city = cities[cityId];
        setCity(_city);
        setCityIsFav(cityIsFavourite(_city, favourites))
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
        const result: any = await reverseGeocode(coords as any);
        const tempCity = {
          name: result.city,
          country: result.country,
          ...coords,
        };
        // console.log(tempCity);
        const { name, country, lat, lon } = tempCity;
        history.push({
          pathname: "/city",
          search: `id=${generateCityId(name, country)}&lat=${lat}&lon=${lon}`,
          state: tempCity,
        });
      } else {
        history.push("/");
      }
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId, coords?.lat, coords?.lon]);

  useUpdateEffect(() => {
    if (cityId) {
      const _city = cities[cityId];
      setCity(_city);
      setCityIsFav(cityIsFavourite(_city, favourites))
    }
  }, [cities, cityId]);

  return { city, cityIsFavourite: cityIsFav, fetchCity, pending, error };
}

function reverseGeocode({ lon, lat }: { lon: number; lat: number }) {
  const googleSDK: any = (window as any).google;
  const OK = (window as any).google.maps.GeocoderStatus.OK;

  const geocoder = new googleSDK.maps.Geocoder();

  // console.log({ lon, lat });
  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { location: { lat, lng: lon } },
      (results: any[], status: any) => {
        if (status === OK) {
          const result = results[0];
          const addressComponents: any[] = result.address_components;
          const cityComponent = addressComponents.find(
            (c) => c.types[0] === "administrative_area_level_1"
          );
          const city = cityComponent.long_name;
          const countryComponent = addressComponents.find(
            (c) => c.types[0] === "country"
          );
          const country = countryComponent.long_name;
          resolve({ city, country });
        } else {
          resolve({ city: "", country: "" });
        }
      }
    );
  });
}
