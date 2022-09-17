export type WeatherReturnData = {
  id?: number;
  name?: string;
  timezone: number;
  sys: {
    country: string;
  };
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

import type { NextApiRequest, NextApiResponse } from "next";

export default async function weather(
  req: NextApiRequest,
  res: NextApiResponse<WeatherReturnData>
) {
  const {
    query: { location },
  } = req;
  const fetchRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location as string
    )}&appid=${process.env.API_KEY}`
  );
  return res.status(200).json(await fetchRes.json());
}
