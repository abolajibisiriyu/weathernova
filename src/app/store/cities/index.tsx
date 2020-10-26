import React, { useReducer } from "react";

import citiesReducer, { hydrate, INITIAL_STATE } from "./reducer";
import { CitiesState } from "./types";

export const CitiesDispatch = React.createContext<
  React.Dispatch<{ type: string; payload?: any }>
>(() => {});
CitiesDispatch.displayName = "CitiesDispatch";

export const CitiesStoreContext = React.createContext<CitiesState>(
  INITIAL_STATE
);
CitiesStoreContext.displayName = "CitiesStoreContext";

const CitiesStore: React.FC = (props) => {
  const [cities, dispatch] = useReducer(citiesReducer, INITIAL_STATE, hydrate);

  return (
    <CitiesStoreContext.Provider value={cities}>
      <CitiesDispatch.Provider value={dispatch}>
        {props.children}
      </CitiesDispatch.Provider>
    </CitiesStoreContext.Provider>
  );
};

export default CitiesStore;
