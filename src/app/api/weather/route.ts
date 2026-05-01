import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const OPENWEATHER_BASE_URL = "https://api.openweathermap.org";
const DEFAULT_COORDINATES = {
  lat: 37.5665,
  lon: 126.978,
};

type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type CurrentWeatherResponse = {
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h"?: number;
  };
  snow?: {
    "1h"?: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
  timezone: number;
};

type ForecastItem = {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: WeatherCondition[];
  pop?: number;
  dt_txt: string;
};

type ForecastResponse = {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
    timezone: number;
  };
};

type AirPollutionResponse = {
  list: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      o3: number;
      pm10: number;
      pm2_5: number;
    };
  }[];
};

type ReverseGeoResponse = {
  local_names?: {
    ko?: string;
    en?: string;
  };
  name: string;
  country: string;
}[];

function parseCoordinate(value: string | null, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getAirQualityLabel(aqi: number) {
  return ["", "아주좋음", "좋음", "보통", "나쁨", "아주나쁨"][aqi] ?? "정보없음";
}

function getDailyForecast(list: ForecastItem[]) {
  const byDate = new Map<string, ForecastItem[]>();

  for (const item of list) {
    const date = item.dt_txt.slice(0, 10);
    byDate.set(date, [...(byDate.get(date) ?? []), item]);
  }

  return Array.from(byDate.entries())
    .slice(0, 5)
    .map(([date, items]) => {
      const noonItem =
        items.find((item) => item.dt_txt.includes("12:00:00")) ??
        items[Math.floor(items.length / 2)];
      const temperatures = items.map((item) => item.main.temp);

      return {
        date,
        min: Math.round(Math.min(...temperatures)),
        max: Math.round(Math.max(...temperatures)),
        description: noonItem.weather[0]?.description ?? "정보없음",
        icon: noonItem.weather[0]?.icon ?? "01d",
      };
    });
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OPENWEATHERMAP_API_KEY is missing. Add it to .env.local and restart the dev server.",
      },
      { status: 500 },
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const lat = parseCoordinate(searchParams.get("lat"), DEFAULT_COORDINATES.lat);
  const lon = parseCoordinate(searchParams.get("lon"), DEFAULT_COORDINATES.lon);

  try {
    const params = {
      lat,
      lon,
      appid: apiKey,
      units: "metric",
      lang: "kr",
    };

    const [current, forecast, air, geo] = await Promise.all([
      axios.get<CurrentWeatherResponse>(
        `${OPENWEATHER_BASE_URL}/data/2.5/weather`,
        { params },
      ),
      axios.get<ForecastResponse>(
        `${OPENWEATHER_BASE_URL}/data/2.5/forecast`,
        { params },
      ),
      axios.get<AirPollutionResponse>(
        `${OPENWEATHER_BASE_URL}/data/2.5/air_pollution`,
        { params },
      ),
      axios.get<ReverseGeoResponse>(`${OPENWEATHER_BASE_URL}/geo/1.0/reverse`, {
        params: {
          lat,
          lon,
          appid: apiKey,
          limit: 1,
        },
      }),
    ]);

    const currentWeather = current.data.weather[0];
    const airQuality = air.data.list[0];
    const locationName =
      geo.data[0]?.local_names?.ko ??
      geo.data[0]?.name ??
      forecast.data.city.name ??
      current.data.name;

    return NextResponse.json({
      location: {
        name: locationName,
        country: geo.data[0]?.country ?? forecast.data.city.country,
        lat,
        lon,
      },
      current: {
        observedAt: current.data.dt,
        timezone: current.data.timezone,
        temp: Math.round(current.data.main.temp * 10) / 10,
        feelsLike: Math.round(current.data.main.feels_like * 10) / 10,
        tempMin: Math.round(current.data.main.temp_min * 10) / 10,
        tempMax: Math.round(current.data.main.temp_max * 10) / 10,
        humidity: current.data.main.humidity,
        pressure: current.data.main.pressure,
        visibility: current.data.visibility,
        windSpeed: Math.round(current.data.wind.speed * 10) / 10,
        windDeg: current.data.wind.deg,
        clouds: current.data.clouds.all,
        rain: current.data.rain?.["1h"] ?? 0,
        snow: current.data.snow?.["1h"] ?? 0,
        sunrise: current.data.sys.sunrise,
        sunset: current.data.sys.sunset,
        condition: {
          id: currentWeather?.id,
          main: currentWeather?.main ?? "Clear",
          description: currentWeather?.description ?? "정보없음",
          icon: currentWeather?.icon ?? "01d",
        },
      },
      hourly: forecast.data.list.slice(0, 8).map((item) => ({
        time: item.dt,
        temp: Math.round(item.main.temp * 10) / 10,
        description: item.weather[0]?.description ?? "정보없음",
        icon: item.weather[0]?.icon ?? "01d",
        pop: Math.round((item.pop ?? 0) * 100),
      })),
      daily: getDailyForecast(forecast.data.list),
      air: {
        label: getAirQualityLabel(airQuality.main.aqi),
        aqi: airQuality.main.aqi,
        co: Math.round(airQuality.components.co * 10) / 10,
        o3: Math.round(airQuality.components.o3 * 10) / 10,
        pm10: Math.round(airQuality.components.pm10 * 10) / 10,
        pm2_5: Math.round(airQuality.components.pm2_5 * 10) / 10,
      },
    });
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ?? error.message
      : "Failed to load weather data.";

    return NextResponse.json({ error: message }, { status: 502 });
  }
}
