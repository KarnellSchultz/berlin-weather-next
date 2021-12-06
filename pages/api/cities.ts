import cities from "../../current.city.list.json";

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

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { city: searchKey } = req.query;

  const filteredCitiesList: CityList[] = cities
    .filter((el) => el.name.toLowerCase().includes(searchKey.toLowerCase()))
    .sort((a, b) => compareNumbers(a.stat.population, b.stat.population));

  const slicedCityList = filteredCitiesList.slice(0, 5);
  console.log(req.query);

  res.status(200).json({ citiesList: slicedCityList });
};
