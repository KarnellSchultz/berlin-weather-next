export const MOST_POPULATED = "most-populated";

export type CityReturnDataType = {
  data: {
    id: number;
    wikiDataId: string;
    type: string;
    city: string;
    name: string;
    country: string;
    countryCode: string;
    region: string;
    regionCode: string;
    latitude: number;
    longitude: number;
    population: number;
  }[];
};

type APIServiceType = {
  GetWeather: (envBasedUrl: string, cityName?: string) => Promise<any>;
  GetCities: (cityName?: string) => Promise<CityReturnDataType>;
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
  GetCities: async (cityName = "") => {
    const url = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${cityName}&hateoasMode=false&limit=5&offset=0&sort=-population`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    return await res.json();
  },
};

// type GetWeatherList = (cityNames: string[]) => Promise<any>;
// export const getWeatherList: GetWeatherList = (cityNames) =>
//   Promise.all(
//     cityNames.map((city) => {
//       city = city.toLocaleLowerCase().replaceAll(" ", "");

//       return APIService.GetWeather(city);
//     })
//   );
