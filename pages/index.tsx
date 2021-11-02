import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useQuery } from "react-query";
import { getWeather } from "../lib/service";
// import { CityList } from "../lib/api/cities";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { getFlagEmoji } from "../utils/getFlagEmoji";
import { RightPanal } from "../components/RightPanal";
import { FetchingIndicator } from "../components/FetchingIndicator";

type HomeProps = {
  API_KEY?: string;
};

export default function Home({ API_KEY }: HomeProps) {
  const [userInput, setUserInput] = useState<string>("");
  const [displayedWeather, setDisplayedWeather] = useLocalStorage<string>(
    "displayedWeather",
    "berlin"
  );

  const {
    isLoading,
    isError: isCitiesError,
    data: cityData,
    refetch: refetchCities,
    isFetching: isCitiesFetching,
  } = useQuery(["citiesList"], () =>
    fetch(`/api/cities?city=${userInput}`).then((d) => d.json())
  );

  const {
    data: weatherData,
    refetch: refetchWeather,
    isSuccess: isWeatherSuccess,
    isFetching: isWeatherFetching,
    isError: isWeatherError,
  } = useQuery(
    ["weather", displayedWeather],
    () => getWeather(displayedWeather, API_KEY),
    {
      refetchInterval: 1000 * 10, // ten seconds
    }
  );

  let isFetching = isCitiesFetching || isWeatherFetching;

  useEffect(() => {
    refetchWeather();
  }, [displayedWeather]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isCitiesError) {
    return <span>There has been an error. . .</span>;
  }

  return (
    <div className="prose p-4 grid sm:grid-cols-2 xs:grid-cols-1 gap-4 mx-auto">
      <Head>
        <title>Weather Finder</title>
        <meta
          name="An app to find out the weather around the planet"
          content="Generated by Karnell"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FetchingIndicator isFetching={isFetching} />

      <div className=" bg-gray-50 flex flex-col">
        <h2>Weather Report</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            refetchCities();
          }}
        >
          <input
            type="text"
            className="p-2 border-2 rounded-md shadow-sm mb-2"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          <button
            className="bg-indigo-400 hover:bg-indigo-300
          active:bg-indigo-500 p-2 shadow-sm rounded-md mb-2
          "
            type="button"
            onClick={() => refetchCities()}
          >
            Search
          </button>
        </form>

        <ul className="grid">
          {cityData &&
            cityData.citiesList.map((city) => (
              <li
                key={city.id}
                className="
                grid grid-cols-2 gap-4 p-4 items-center
              bg-gray-200 rounded-md"
                onClick={() => setDisplayedWeather(city.name)}
              >
                <div>
                  <div>{city.name}</div>
                  <div>{city.country}</div>
                  <div>{getFlagEmoji(city.country)}</div>
                </div>
                <button
                  className="p-3 bg-indigo-400 hover:bg-indigo-300
                focus:bg-indigo-500 focus:text-white
                  rounded-md"
                  onClick={() => setDisplayedWeather(city.name)}
                >
                  Click
                </button>
              </li>
            ))}
        </ul>
      </div>
      <RightPanal
        weatherData={weatherData}
        isWeatherError={isWeatherError}
        isWeatherSuccess={isWeatherSuccess}
      />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      API_KEY: process.env.API_KEY,
    },
  };
}
