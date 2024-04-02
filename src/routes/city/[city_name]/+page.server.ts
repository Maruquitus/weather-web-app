import { getCurrentWeather, getDayWeather, getWeekWeather } from "$lib/api";
/** @type {import('./$types').PageLoad} */
type Params = {
  city_name: string;
};

export async function load({ params }: { params: Params }) {
  let [currentWeather, weekWeather, dayWeather] = await Promise.all([
    getCurrentWeather(params.city_name),
    getWeekWeather(params.city_name),
    getDayWeather(params.city_name),
  ]).catch((e: Error) => {
    throw new Error("Não foi possível encontrar a cidade");
  });

  return {
    current: currentWeather,
    week: weekWeather,
    day: dayWeather,
  };
}
