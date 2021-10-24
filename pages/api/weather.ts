export type WeatherReturnData = {
  id?: number;
  name?: string;
  timezone: number;
  weather?: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  visibility?: number;
  wind?: { speed: number; deg: 84; gust: number };
  main?: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
};
export type GetWeather = (
  cityNameSeachKey?: string,
  API_KEY?: string
) => Promise<WeatherReturnData>;
export const getWeather: GetWeather = async (cityNameSeachKey, API_KEY) => {
  const resp = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityNameSeachKey}&appid=${process.env.API_KEY}`
  );
  if (!resp.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await resp.json();
  return data;
};

type GetWeatherList = (cityNames: string[]) => Promise<any>;

const getWeatherList: GetWeatherList = (cityNames) =>
  Promise.all(
    cityNames.map((city) => {
      city = city.toLocaleLowerCase().replaceAll(" ", "");
      console.log("CITY>>>", city);

      return getWeather(city);
    })
  );

export default getWeatherList;
