import { City } from "app/store/cities/types";

export const generateCityId = (...args: string[]) =>
  args.map((s) => s.toLowerCase().split(" ").join("_")).join("_");

export const cityIsFavourite = (city: City, favouritesArray: string[]) => {
  return favouritesArray.findIndex((f) => f === city.id) !== -1;
};

export const isUserCity = (id: string, userLocationArray: string[]) => {
  return userLocationArray.findIndex((l) => l === id) !== -1;
};
