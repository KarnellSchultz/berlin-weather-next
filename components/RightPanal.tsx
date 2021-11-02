import React from "react";
import { WeatherReturnData } from "../lib/api";
import { getFlagEmoji } from "../utils/getFlagEmoji";

type Props = {
  weatherData: WeatherReturnData;
  isWeatherSuccess: boolean;
  isWeatherError: boolean;
};

export const RightPanal = ({
  weatherData,
  isWeatherSuccess,
  isWeatherError,
}: Props) => {
  return (
    <div>
      <section className="flex flex-col flex-auto">
        <h3>Weather info central!</h3>

        {isWeatherError ? (
          <div className="bg-red-300">there has been an error 😓</div>
        ) : null}

        {weatherData ? (
          <div className="bg-indigo-200 rounded-md p-3">
            <ul className="grid grid-cols-1 bg-indigo-300 p-3 ">
              <li>{weatherData.name}</li>
              <li>{getFlagEmoji(weatherData.sys.country)}</li>
              <li>{weatherData.weather[0].main}</li>
              <li>{weatherData.timezone}</li>
              <li>{weatherData.main.humidity}</li>
            </ul>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={`${weatherData.weather[0].description}`}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
};
