Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: jest.fn(),
});

export const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

Object.defineProperty(window.navigator, "geolocation", {
  writable: true,
  value: mockGeolocation,
});

const AutoCompleteMock = jest.fn();
AutoCompleteMock.prototype.addListener = jest.fn();
AutoCompleteMock.prototype.getPlaces = jest.fn();

Object.defineProperty(window, "google", {
  writable: true,
  value: {
    maps: {
      places: {
        Autocomplete: AutoCompleteMock,
      },
    },
  },
});
