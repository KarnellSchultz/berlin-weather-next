export const getWeather = async (cityName = "tampa", API_KEY: string) => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
  );
  if (!resp.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await resp.json();
  return data;
};

export async function getServerSideProps() {
  return {
    props: {
      API_KEY: process.env.API_KEY,
    },
  };
}
