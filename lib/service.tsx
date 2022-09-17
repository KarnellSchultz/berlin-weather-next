export const MOST_POPULATED = "most-populated";

type APIServiceType = {
  GetWeather: (envBasedUrl: string, cityName?: string) => Promise<any>;
  GetCities: (envBasedUrl: string, cityName?: string) => Promise<any>;
};

export const APIService: APIServiceType = {
  GetWeather: async (envBasedUrl, cityName = "Shanghai") => {
    const url = `${envBasedUrl}/api/weather/${cityName}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  },
  GetCities: async (envBasedUrl, cityName = MOST_POPULATED) => {
    const url = `${envBasedUrl}/api/city/${cityName}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    return await res.json();
  },
};

type GetWeatherList = (cityNames: string[]) => Promise<any>;
export const getWeatherList: GetWeatherList = (cityNames) =>
  Promise.all(
    cityNames.map((city) => {
      city = city.toLocaleLowerCase().replaceAll(" ", "");

      return APIService.GetWeather(city);
    })
  );
