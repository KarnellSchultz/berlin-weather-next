export const MOST_POPULATED = "most-populated";

type APIServiceType = {
  GetWeather: (envBasedUrl: string, cityName?: string) => Promise<any>;
  GetCities: (envBasedUrl: string, cityName?: string) => Promise<any>;
};

export const APIService: APIServiceType = {
  GetWeather: async (envBasedUrl, cityName = "Shanghai") => {
    const baseUrl = new URL("/api/weather/", envBasedUrl);
    const url = new URL(cityName, baseUrl);
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("Network response was not ok");
    }
    return await resp.json();
  },
  GetCities: async (envBasedUrl, cityName = MOST_POPULATED) => {
    const baseUrl = new URL("/api/city/", envBasedUrl);
    const url = new URL(cityName, baseUrl);

    const res = await fetch(url);
    const data = await res.json();

    return data;
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
