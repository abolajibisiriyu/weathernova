import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { mockGeolocation } from "./windowMocks";
import App from "app";

import useLoadScript, { loadScriptParams } from "app/hooks/useLoadScript";
import { waitFor } from "./setup";

jest.mock("app/hooks/useLoadScript");

describe("App", () => {
  beforeEach(() => {
    useLoadScript.mockImplementation((params: loadScriptParams) => {
      useEffect(() => {
        params.onLoad && params.onLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    });
  });

  afterEach(() => {
    useLoadScript.mockReset();
    mockGeolocation.getCurrentPosition.mockReset();
  });

  test("renders app logo", async () => {
    render(<App />);

    expect(useLoadScript).toBeCalled();

    expect(await screen.findByText("Weathernova")).toBeInTheDocument();
  });

  test("Asks user for location", async () => {
    render(<App />);

    await waitFor(() => {
      expect(useLoadScript).toBeCalled();
    });

    expect(mockGeolocation.getCurrentPosition).toBeCalled();
  });
});
