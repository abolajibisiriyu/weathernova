import React, { BaseHTMLAttributes } from "react";
import formatDate from "date-fns/format";

import { CityBox } from "./styles";
import { ReactComponent as Celcius } from "app/assets/images/celsius.svg";
import { ReactComponent as DeleteIcon } from "app/assets/images/remove.svg";
import { ReactComponent as StarIcon } from "app/assets/images/star.svg";
import { City } from "app/store/cities/types";

type CityWeatherAction = (c: City) => void;
interface Props extends BaseHTMLAttributes<any> {
  showRemoveButton?: boolean;
  onRemoveClicked?: CityWeatherAction;
  onFavouriteClicked?: CityWeatherAction;
  city: City;
  isFavourite?: boolean;
}
export const CityWeather: React.FC<Props> = (props) => {
  const {
    showRemoveButton,
    onRemoveClicked,
    onFavouriteClicked,
    city,
    isFavourite,
    ...rest
  } = props;

  const _onRemoveClicked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onRemoveClicked && onRemoveClicked(city);
  };
  const _onFavouriteClicked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onFavouriteClicked && onFavouriteClicked(city);
  };

  return (
    <CityBox {...rest}>
      <button
        className={`remove ${showRemoveButton ? "show" : ""}`}
        onClick={_onRemoveClicked}
      >
        <DeleteIcon />
      </button>
      <div>
        <p className="temperature">
          {city.current.temp} <Celcius />
        </p>
        <p className="city text-28">{city.name}</p>
        <button className="favourite" onClick={_onFavouriteClicked}>
          <StarIcon className={`${isFavourite ? "favourite" : ""}`} />
        </button>
      </div>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${city.current.weather[0].icon}@4x.png`}
          alt="sunny"
          className="icon"
        />
        <p className="description text-18">{city.current.weather[0].main}</p>
        <div className="date">
          <p>{formatDate(new Date(city.current.dt * 1000), "d LLL")}</p>
          <p className="text-36">
            {new Date(city.current.dt * 1000).getFullYear()}
          </p>
        </div>
      </div>
    </CityBox>
  );
};

export default CityWeather;
