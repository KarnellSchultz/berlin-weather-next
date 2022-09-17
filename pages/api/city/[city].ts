import type { NextApiRequest, NextApiResponse } from "next";

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

export default async function GetCitiesEndpoint(
  req: NextApiRequest,
  res: NextApiResponse<CityReturnDataType>
) {
  const { city } = req.query;
  
  const url = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${
    city === "most-populated" ? "" : city
  }&hateoasMode=false&limit=5&offset=0&sort=-population`;
  
  const response = await fetch(url);
  if (!response.ok) {
    return res.status(404).json(await response.json());
  }

  res.status(200).json(await response.json());
}
