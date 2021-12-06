export type WeatherReturnData = {
  id?: number;
  name?: string;
  timezone: number;
  sys?: Sys;
  weather?: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  visibility?: number;
  wind?: { speed: number; deg: number; gust: number };
  main?: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
};

type Sys = {
  type?: number;
  id?: number;
  country?: string;
  sunrise?: number;
  sunset?: number;
}

type CityList = {
  id: number;
  name: string;
  country: string;
  stat: {
    level: number;
    population: number;
  };
};

export type GetWeather = (
  cityNameSeachKey?: string,
  API_KEY?: string
) => Promise<WeatherReturnData>;

export const getWeather: GetWeather = async (cityNameSeachKey, API_KEY) => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityNameSeachKey}&appid=${API_KEY}`
  );
  if (!resp.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await resp.json();
  return data;
};

type GetWeatherList = (cityNames: CityList[], API_KEY: string) => Promise<any>;

export const getWeatherList: GetWeatherList = (cityNames, API_KEY) => {
  console.log(cityNames, API_KEY);

  return Promise.all(
    cityNames.map(({ name }) => {
      name = name.toLocaleLowerCase().replaceAll(" ", "");
      console.log("CITY>>>", name);

      return getWeather(name, API_KEY);
    })
  );
};
