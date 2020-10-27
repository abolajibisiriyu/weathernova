import React from "react";
import mockAxios from "axios";

import { RouteContent } from "app/Routes";
import { setup, waitFor, fireEvent, screen } from "__tests__/setup";
import storage from "app/utils/storage";

const dummyCityWeatherData = {
  lat: 40.12,
  lon: -96.66,
  timezone: "America/Chicago",
  timezone_offset: -18000,
  current: {
    dt: 1595243443,
    sunrise: 1595243663,
    sunset: 1595296278,
    temp: 293.28,
    feels_like: 293.82,
    pressure: 1016,
    humidity: 100,
    dew_point: 293.28,
    uvi: 10.64,
    clouds: 90,
    visibility: 10000,
    wind_speed: 4.6,
    wind_deg: 310,
    weather: [
      {
        id: 501,
        main: "Rain",
        description: "moderate rain",
        icon: "10n",
      },
      {
        id: 201,
        main: "Thunderstorm",
        description: "thunderstorm with rain",
        icon: "11n",
      },
    ],
    rain: {
      "1h": 2.93,
    },
  },
};
describe("Home page", () => {
  afterEach(() => {
    mockAxios.__mock.reset();
    storage.clear();
  });

  test("Renders top 15 most populous cities by default", async () => {
    (mockAxios.__mock.instance.get as any).mockResolvedValue({
      data: dummyCityWeatherData,
    });

    setup(<RouteContent />);

    expect(mockAxios.__mock.instance.get).toBeCalledTimes(15);

    await waitFor(async () => {
      const citiesContainer = screen.getByTestId("cities");
      expect(citiesContainer).toBeInTheDocument();
      expect(citiesContainer.children.length).toBe(15);
    });
  });

  test("City can be marked as favourite", async () => {
    (mockAxios.__mock.instance.get as any).mockResolvedValue({
      data: dummyCityWeatherData,
    });

    setup(<RouteContent />);

    await waitFor(async () => {
      const citiesContainer = screen.getByTestId("cities");
      const favouriteCitiesContainer = screen.getByTestId("favourite-cities");
      expect(citiesContainer).toBeInTheDocument();
      expect(favouriteCitiesContainer).toBeInTheDocument();
      expect(citiesContainer.children.length).toBe(15);

      const favouriteButton = citiesContainer.children[0].getElementsByClassName(
        "favourite"
      )[0];

      fireEvent.click(favouriteButton);

      expect(favouriteCitiesContainer.children.length).toBe(1);
    });
  });

  test("Loads saved cities", async () => {
    storage.set("cities", {
      beijin_china: { ...dummyCityWeatherData, id: "beijin_china" },
    });

    setup(<RouteContent />);

    expect(mockAxios.__mock.instance.get).toBeCalledTimes(1);

    await waitFor(() => {
      const citiesContainer = screen.getByTestId("cities");
      expect(citiesContainer).toBeInTheDocument();
      expect(citiesContainer.children.length).toBe(1);
    });
  });
});
