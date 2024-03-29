import React from "react";
import Image from "next/image";

import { WeatherReturnData } from "../pages/api/weather/[location]";
import { getFlagEmoji } from "../utils/getFlagEmoji";

const WeatherDataContainer = ({
  weatherData,
}: {
  weatherData: WeatherReturnData;
}) => {
  return (
    <div>
      <ul className="grid grid-cols-1 bg-indigo-500 p-3">
        <li>{weatherData?.name}</li>
        <li>{getFlagEmoji(weatherData.sys.country)}</li>
        <li>{weatherData.weather[0].main}</li>
        <li>Humidity: {weatherData.main.humidity}</li>
      </ul>
      <Image
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        height={120}
        width={120}
        alt={`${weatherData.weather[0].description}`}
      />
    </div>
  );
};

type Props = {
  weatherData: WeatherReturnData;
  isWeatherSuccess?: boolean;
  isWeatherError: boolean;
};
export const RightPanel = ({
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
        <div className="bg-indigo-400 rounded-md p-3 text-white">
          <div className="grid grid-cols-1 bg-indigo-500 p-3 ">
            {!isWeatherError && isWeatherSuccess && weatherData?.id && (
              <WeatherDataContainer weatherData={weatherData} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

function Fallback() {
  return (
    <div className="bg-indigo-400 rounded-md p-3 text-white">
      <ul className="grid grid-cols-1 bg-indigo-500 p-3 ">
        <li>Loading . . .</li>
        <li>Loading . . .</li>
      </ul>
    </div>
  );
}
