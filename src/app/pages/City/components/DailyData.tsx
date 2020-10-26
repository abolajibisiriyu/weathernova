import React from "react";
import chunk from "lodash.chunk";
import formatDate from "date-fns/format";

import { DailyData as Container } from "../styles";
import { ReactComponent as Celcius } from "app/assets/images/celsius.svg";
import { City } from "app/store/cities/types";

interface Props {
  city: City;
}
const DailyData: React.FC<Props> = (props) => {
  const { city } = props;

  return (
    <Container>
      {chunk(city.daily.slice(0, 6), 3).map((row, i) => (
        <div className="row" key={i}>
          {row.map((weather, i) => (
            <div className="data" key={i}>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="sunny"
                className="icon"
              />
              <p className="description text-16">{weather.weather[0].main}</p>
              <p className="temperature text-36">
                {weather.temp.day} <Celcius />
              </p>
              <p className="text-16">
                {formatDate(new Date(weather.dt * 1000), "iii, d LLL")}
              </p>
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
};

export default DailyData;
