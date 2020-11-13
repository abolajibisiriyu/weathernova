import React, { useEffect, useRef, useState } from "react";

// import Loader from "../Loader";

import { InputBox, SearchContainer } from "./styles";
import { ReactComponent as SearchIcon } from "app/assets/images/search.svg";
import { ReactComponent as DeleteIcon } from "app/assets/images/remove.svg";
import Button from "app/styles/Button";
import { useHistory } from "react-router-dom";
import { generateCityId } from "app/utils/city";

const SearchInput: React.FC = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchVal, setSearchVal] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchVal(e.target.value);

  const onClearInput = () => {
    setSearchVal("");
    inputRef.current?.focus();
  };

  const autocompleteRef = useRef<any>(null);
  const [autocompleteResult, setAutocompleteResult] = useState<any>();
  const autocompleteOptions = { types: ["(cities)"] };

  useEffect(() => {
    autocompleteRef.current = new (window as any).google.maps.places.Autocomplete(
      inputRef.current,
      autocompleteOptions
    );

    autocompleteRef.current?.addListener("place_changed", () => {
      const result = autocompleteRef.current?.getPlace();
      if (result) {
        setSearchVal(result.formatted_address);
        const countryComponent = result.address_components.find(
          (c: any) => c.types[0] === "country"
        );
        const country = countryComponent.long_name;
        const name = result.name;
        const lat = result.geometry.location.lat();
        const lon = result.geometry.location.lng();
        setAutocompleteResult({ name, country, lat, lon });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchVal || !autocompleteResult) return;
    const { name, country, lat, lon } = autocompleteResult;
    history.push({
      pathname: "/city",
      search: `id=${generateCityId(name, country)}&lat=${lat}&lon=${lon}`,
      state: autocompleteResult,
    });
    setSearchVal("");
    setAutocompleteResult(undefined);
  };

  const [isOnline, setIsOnline] = React.useState(true);
  const handleOnlineChange = () => {
    console.log("Is online: ", navigator.onLine);
    const _isOnline = navigator.onLine;
    setIsOnline(_isOnline);
    if (!_isOnline) setSearchVal("");
  };

  React.useEffect(() => {
    window.addEventListener("offline", handleOnlineChange);
    window.addEventListener("online", handleOnlineChange);

    return () => {
      window.removeEventListener("offline", handleOnlineChange);
      window.removeEventListener("online", handleOnlineChange);
    };
  });

  return (
    <SearchContainer onSubmit={onSubmit}>
      <InputBox>
        {/* <Loader className="prefix" /> */}
        <SearchIcon className="prefix" />
        <input
          ref={inputRef}
          type="text"
          placeholder={isOnline ? "Search city" : "You are offline, Reconnect to use search"}
          value={searchVal}
          onChange={handleInputChange}
          disabled={!isOnline}
        />
        <button
          className="clear-btn"
          onClick={onClearInput}
        >
          <DeleteIcon />
        </button>
      </InputBox>
      <Button type="submit" disabled={!isOnline}>View</Button>
    </SearchContainer>
  );
};

export default SearchInput;
