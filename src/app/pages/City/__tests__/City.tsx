import React from "react";
import mockAxios from "axios";

import { RouteContent } from "app/Routes";
import { setup, waitFor, screen } from "__tests__/setup";
import storage from "app/utils/storage";
import reverseGeocode from "../utils/reverseGeocode";

jest.mock("../utils/reverseGeocode");

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
  daily: [
    {
      dt: 1595268000,
      sunrise: 1595243663,
      sunset: 1595296278,
      temp: {
        day: 298.82,
        min: 293.25,
        max: 301.9,
        night: 293.25,
        eve: 299.72,
        morn: 293.48,
      },
      feels_like: {
        day: 300.06,
        night: 292.46,
        eve: 300.87,
        morn: 293.75,
      },
      pressure: 1014,
      humidity: 82,
      dew_point: 295.52,
      wind_speed: 5.22,
      wind_deg: 146,
      weather: [
        {
          id: 502,
          main: "Rain",
          description: "heavy intensity rain",
          icon: "10d",
        },
      ],
      clouds: 97,
      pop: 1,
      rain: 12.57,
      uvi: 10.64,
    },
  ],
};
describe("City page", () => {
  afterEach(() => {
    mockAxios.__mock.reset();
    storage.clear();
  });

  test("Shows city detail based on geolocation", async () => {
    (mockAxios.__mock.instance.get as any).mockResolvedValue({
      data: dummyCityWeatherData,
    });

    reverseGeocode.mockImplementation((params) =>
      Promise.resolve({ city: "Beijing", country: "China" })
    );

    setup(<RouteContent />, {
      route: `/city?lon=${dummyCityWeatherData.lon}&lat=${dummyCityWeatherData.lat}`,
    });

    expect(reverseGeocode).toBeCalled();

    await waitFor(async () => {
      const weatherInfo = screen.getByTestId("city-weather");
      expect(weatherInfo).toBeInTheDocument();
    });
  });

  test("Shows city detail from storage", async () => {
    (mockAxios.__mock.instance.get as any).mockResolvedValue({
      data: dummyCityWeatherData,
    });

    storage.set("cities", {
      beijin_china: { ...dummyCityWeatherData, id: "beijin_china" },
    });

    setup(<RouteContent />, { route: "/city?id=beijin_china" });

    expect(mockAxios.__mock.instance.get).toBeCalledTimes(1);

    const weatherInfo = await screen.findByTestId("city-weather");
    expect(weatherInfo).toBeInTheDocument();
  });

  test("Redirects to home if no geolocation and city id is not cached", async () => {
    (mockAxios.__mock.instance.get as any).mockResolvedValue({
      data: dummyCityWeatherData,
    });

    setup(<RouteContent />, { route: "/city" });

    await waitFor(async () => {
      expect(window.location.pathname).toBe("/");

      expect(mockAxios.__mock.instance.get).toBeCalledTimes(15);
    });
  });

  test("Redirects to home if city id is not cached", async () => {
    (mockAxios.__mock.instance.get as any).mockResolvedValue({
      data: dummyCityWeatherData,
    });

    storage.set("cities", {
      beijin_china: { ...dummyCityWeatherData, id: "beijin_china" },
    });

    setup(<RouteContent />, {
      route: "/city?id=some_random_string",
    });

    await waitFor(async () => {
      expect(window.location.pathname).toBe("/");

      expect(mockAxios.__mock.instance.get).toBeCalledTimes(1);
    });
  });
});
