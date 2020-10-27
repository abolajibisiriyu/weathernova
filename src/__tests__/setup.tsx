import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CitieStore from "app/store/cities";
import "./windowMocks";

export function setup(
  ui: React.ReactElement<any>,
  { route = "/", ...overrides } = {}
) {
  return render(
    <CitieStore>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </CitieStore>,
    overrides
  );
}

export {
  waitFor,
  fireEvent,
  act,
  cleanup,
  screen,
} from "@testing-library/react";
