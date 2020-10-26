import request from "./request";

export const fetchCityWeather = async (payload: {
  lon: number;
  lat: number;
}) => {
  return await request.get<any>("/onecall", {
    params: {
      ...payload,
      exclude: "minutely,hourly,alerts",
    },
  });
};

const cityService = { fetchCityWeather };

export default cityService;
