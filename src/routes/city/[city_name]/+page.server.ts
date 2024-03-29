import { getCurrentWeather, getDayWeather, getWeekWeather } from "$lib/api";
/** @type {import('./$types').PageLoad} */

export async function load({ params }) {

	let currentWeather = await getCurrentWeather(params.city_name);
  let weekWeather = await getWeekWeather(params.city_name);
  let dayWeather = await getDayWeather(params.city_name);
  return {
    current: currentWeather,
    week: weekWeather,
    day: dayWeather,
  }
}
