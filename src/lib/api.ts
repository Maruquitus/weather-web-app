import type { WeatherData } from '$lib/types';
const filter = (data: any) => {
    return {
      date: data.date,
      city: data.location ? data.location.name : "Not specified",
      region: data.location ? data.location.region : "Not specified",
      temp: data.location ? data.current.temp_c : data.temp_c,
      condition: data.current && data.condition == undefined ? data.current.condition.text : data.condition.text,
      condition_icon: data.current && data.condition == undefined ? data.current.condition.icon : data.condition.icon,
      feelslike: data.location ? data.current.feelslike_c : data.feelslike_c,
      windspeed: data.location ? data.current.gust_kph : data.gust_kph,
      humidity: data.location ? data.current.humidity : data.humidity,
      uvindex: data.location ? data.current.uv : data.uv,
      maxtemp_c: data.maxtemp_c,
      mintemp_c: data.mintemp_c,
  
    } as WeatherData;
  }

export async function getCurrentWeather(city: String) {
    const res = await fetch(`${process.env.API_URL}/current.json?key=${process.env.API_KEY}&q=${city}&aqi=no&lang=pt`, {method: "POST"})
    const data = await res.json();
    return filter(data);
}

export async function getWeekWeather(city: String) {
    const res = await fetch(`${process.env.API_URL}/forecast.json?key=${process.env.API_KEY}&q=${city}&aqi=no&lang=pt&days=7&hour=12`, {method: "POST"})
    const data = await res.json();
    let result: WeatherData[] = [];
    for (let day of data.forecast.forecastday) {
        let d = day.day;
        d.date = new Date(day.date).toLocaleDateString("pt", { weekday: 'short'});
        result.push(filter(d));
    }
    return result;
}

export async function getDayWeather(city: String) {
    let result: WeatherData[] = [];
    for (let hour of [6, 9, 12, 15, 18, 21]) {
        const res = await fetch(`${process.env.API_URL}/forecast.json?key=${process.env.API_KEY}&q=${city}&aqi=no&lang=pt&days=1&hour=${hour}`, {method: "POST"})
        const data = await res.json();
        result.push(
            filter(data.forecast.forecastday[0].hour[0])
        )
    }
    return result;
}