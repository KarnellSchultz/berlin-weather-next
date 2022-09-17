import { CityReturnDataType } from "../pages/api/city/[city]";
export const MOST_POPULATED = "most-populated";

type APIServiceType = {
  GetWeather: (cityName?: string) => Promise<any>;
  GetCities: (cityName?: string) => Promise<CityReturnDataType>;
};

export const APIService: APIServiceType = {
  GetWeather: async (cityName = "Shanghai") => {
    const url = `/api/weather/${cityName}`;
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  },
  GetCities: async (cityName = MOST_POPULATED) => {
    const res = await fetch(`/api/city/${cityName}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  },
};
