export type WeatherData = {
  city?: string;
  region?: string;
  temp: number;
  condition: string;
  condition_icon: string;
  feelslike: number;
  windspeed: number;
  humidity: number;
  uvindex: number;
  maxtemp_c?: number;
  mintemp_c?: number;
  date: string;
};

export type WeatherDataset = {
  current: WeatherData;
  day: WeatherData[];
  week: WeatherData[];
};
