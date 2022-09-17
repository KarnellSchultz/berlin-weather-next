import type { NextApiRequest, NextApiResponse } from "next";
import { MOST_POPULATED } from "../../../lib/service";
import cities from "../../../current.city.list.json";

export type CityList = {
  id: number;
  name: string;
  country: string;
  stat: {
    level: number;
    population: number;
  };
};

const compareNumbers = (a: number, b: number) => {
  return b - a;
};

export default function getCity(
  req: NextApiRequest,
  res: NextApiResponse<CityList[]>
) {
  const city = req.query.city as string;

  if (city === MOST_POPULATED) {
    const filteredCitiesList = [cities as unknown as CityList].sort((a, b) =>
      compareNumbers(a.stat.population, b.stat.population)
    );

    const slicedCityList = filteredCitiesList.slice(0, 5);
    return res.status(200).json(slicedCityList);
  }

  const filteredCitiesList = [cities as unknown as CityList]
    .filter((el) => el.name.toLowerCase().includes(city.toLowerCase()))
    .sort((a, b) => compareNumbers(a.stat.population, b.stat.population));

  const slicedCityList = filteredCitiesList.slice(0, 5);

  res.status(200).json(slicedCityList);
}
