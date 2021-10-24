import cities from "../../current.city.list.json";

type CityList = {
  id: number;
  name: string;
  country: string;
  stat: {
    level: number;
    population: number;
  };
};

const compareNumbers = (a, b) => {
  return b - a;
};

export default async (req, res) => {
  const { city: searchKey } = req.query;

  const filteredCitiesList: CityList[] = cities
    .filter((el) => el.name.toLowerCase().includes(searchKey.toLowerCase()))
    .sort((a, b) => compareNumbers(a.stat.population, b.stat.population));

  const slicedCityList = filteredCitiesList.slice(0, 5);
  console.log(req.query);

  res.status(200).json({ citiesList: slicedCityList });
};

// try {
//   const data: WeatherReturnData[] = await Promise.all(
//     filteredCitiesList.map((town) => getWeather(town.name))
//   );
//   console.log(">>>DONE", data);
//   return res.status(200).json({ city: data });
// } catch (error) {
//   console.error(error);
//   res.status(400).json({ error: "oh no" });
// }
