"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type WeatherPayload = {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    observedAt: number;
    timezone: number;
    temp: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    visibility: number;
    windSpeed: number;
    windDeg: number;
    clouds: number;
    rain: number;
    snow: number;
    sunrise: number;
    sunset: number;
    condition: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
  };
  hourly: {
    time: number;
    temp: number;
    description: string;
    icon: string;
    pop: number;
  }[];
  daily: {
    date: string;
    min: number;
    max: number;
    description: string;
    icon: string;
  }[];
  air: {
    label: string;
    aqi: number;
    co: number;
    o3: number;
    pm10: number;
    pm2_5: number;
  };
};

type Tab = "current" | "daily" | "air" | "etc";

const tabs: { id: Tab; label: string }[] = [
  { id: "current", label: "현재날씨" },
  { id: "daily", label: "일기예보" },
  { id: "air", label: "미세먼지" },
  { id: "etc", label: "기타" },
];

const seoul = {
  lat: 37.5665,
  lon: 126.978,
};

const panelClass = "bg-black/40";

function androidIcon(icon?: string) {
  return `/weather-app-assets/a${icon ?? "01d"}.webp`;
}

function formatClock(timestamp?: number | null, timezone = 32400) {
  if (!timestamp) return "--:--:--";

  const date = new Date((timestamp + timezone) * 1000);
  const hour = date.getUTCHours();
  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${period} ${displayHour}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
}

function formatHour(timestamp: number, timezone = 32400) {
  const date = new Date((timestamp + timezone) * 1000);
  const hour = date.getUTCHours();
  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${period} ${displayHour}시`;
}

function formatDay(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][
    new Date(Date.UTC(year, month - 1, day, 12)).getUTCDay()
  ];

  return `${month}.${day} (${weekday})`;
}

function getBackgroundIndex(data: WeatherPayload | null, timestamp: number) {
  if (!data) {
    return 4;
  }

  const now = timestamp * 1000;
  const sunrise = data.current.sunrise * 1000;
  const sunset = data.current.sunset * 1000;
  const localSeconds = timestamp + data.current.timezone;
  const localDayStartSeconds = localSeconds - (localSeconds % 86400);
  const noon = (localDayStartSeconds + 12 * 60 * 60 - data.current.timezone) * 1000;
  const midnight = (localDayStartSeconds + 24 * 60 * 60 - data.current.timezone) * 1000;

  const sunriseMinus30 = sunrise - 30 * 60 * 1000;
  const sunrisePlus30 = sunrise + 30 * 60 * 1000;
  const sunrisePlus60 = sunrise + 60 * 60 * 1000;
  const sunsetMinus60 = sunset - 60 * 60 * 1000;
  const sunsetMinus30 = sunset - 30 * 60 * 1000;
  const sunsetPlus30 = sunset + 30 * 60 * 1000;

  if (now < sunriseMinus30) return 8;
  if (now < sunrise) return 0;
  if (now < sunrisePlus30) return 1;
  if (now < sunrisePlus60) return 2;
  if (now < noon) return 3;
  if (now < sunsetMinus60) return 4;
  if (now < sunsetMinus30) return 5;
  if (now < sunset) return 6;
  if (now < sunsetPlus30) return 7;
  if (now < midnight) return 8;

  return 8;
}

function backgroundImage(data: WeatherPayload | null, timestamp: number) {
  return `/weather-app-assets/num${getBackgroundIndex(data, timestamp)}.webp`;
}

function windDirection(deg: number) {
  const directions = ["북", "북동", "동", "남동", "남", "남서", "서", "북서"];
  return directions[Math.round(deg / 45) % 8];
}

function hasRainOrSnow(data: WeatherPayload) {
  return data.hourly.some((hour) => {
    const text = `${hour.description} ${hour.icon}`.toLowerCase();
    return text.includes("비") || text.includes("눈") || hour.pop >= 60;
  });
}

export function WeatherPhone() {
  const [tab, setTab] = useState<Tab>("current");
  const [data, setData] = useState<WeatherPayload | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backgroundTimestamp = now ?? data?.current.observedAt ?? 0;
  const backgroundIndex = getBackgroundIndex(data, backgroundTimestamp);

  async function loadWeather() {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        lat: String(seoul.lat),
        lon: String(seoul.lon),
      });
      const response = await fetch(`/api/weather?${params.toString()}`, {
        cache: "no-store",
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "날씨 데이터를 불러오지 못했습니다.");
      }

      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "날씨 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void Promise.resolve().then(loadWeather);
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => {
      setNow(Math.floor(Date.now() / 1000));
    });
    const timer = window.setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#202020] px-4 py-6">
      <section className="mx-auto flex w-full max-w-[390px] items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-[26px] border border-white/10 bg-black p-2 shadow-2xl shadow-black/50">
          <div className="relative flex aspect-[9/17] flex-col overflow-hidden rounded-[20px] text-white">
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
              style={
                {
                  backgroundImage: `url(${backgroundImage(data, backgroundTimestamp)})`,
                } as CSSProperties
              }
            />
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
              style={
                {
                  backgroundImage: `url(/weather-app-assets/bgimg.webp)`,
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(0,0,0,0.35) 55%, black 68%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(0,0,0,0.35) 55%, black 68%)",
                } as CSSProperties
              }
            />
            <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/0 via-black/0 to-black/20" />
            <WeatherEffect data={data} backgroundIndex={backgroundIndex} />
            <div className="relative z-10 flex min-h-0 flex-1 flex-col">
              <div className="min-h-0 flex-1">
                {tab === "current" ? (
                  <CurrentWeather data={data} loading={loading} error={error} now={now} />
                ) : null}
                {tab === "daily" ? <DailyWeather data={data} /> : null}
                {tab === "air" ? <AirPollution data={data} /> : null}
                {tab === "etc" ? <EtcWeather data={data} /> : null}
              </div>

              <nav className="grid h-[74px] grid-cols-4 rounded-t-[18px] border border-white/10 bg-[#111]/95 text-[16px] font-medium">
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`border-r border-white/[0.03] text-white transition last:border-r-0 ${
                      tab === item.id ? "bg-white/[0.045]" : "bg-transparent"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CurrentWeather({
  data,
  loading,
  error,
  now,
}: {
  data: WeatherPayload | null;
  loading: boolean;
  error: string | null;
  now: number | null;
}) {
  const forecastText = data
    ? `오늘 내에 눈이나 비가 예상${hasRainOrSnow(data) ? "됩니다." : "되지 않습니다."}`
    : loading
      ? "날씨 정보를 불러오는 중입니다."
      : "날씨 정보를 불러오지 못했습니다.";

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <section className="flex min-h-0 flex-1 items-center justify-center px-[30px] pt-5 text-center">
        <div>
          <p className="text-[39px] font-normal leading-tight tracking-normal">
            {formatClock(now, data?.current.timezone)}
          </p>
          <p className="mt-3 text-[22px] font-normal leading-tight">
            위도{data ? data.location.lat.toFixed(6) : "37.566500"}
          </p>
          <p className="text-[22px] font-normal leading-tight">
            경도{data ? data.location.lon.toFixed(6) : "126.978000"}
          </p>
          <p className="mt-4 text-[38px] font-normal leading-tight">
            {data ? `${data.current.temp.toFixed(1)}℃` : "--.-℃"}
          </p>
          <p className="mt-4 text-[34px] font-semibold leading-tight">
            현재 날씨는 {data?.current.condition.description ?? "확인중"}
          </p>
          <p className="mt-3 text-[34px] font-semibold leading-tight">
            미세먼지 농도: {data?.air.label ?? "확인중"}
          </p>
          {error ? (
            <p className={`mx-auto mt-4 max-w-[300px] rounded-[8px] p-3 text-[14px] leading-5 ${panelClass}`}>
              {error}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-[10px] mb-[10px] flex h-[220px] shrink-0 flex-col overflow-hidden">
        <div className={`flex flex-[2] items-center rounded-t-[12px] px-[10px] ${panelClass}`}>
          <p className="text-[25px] font-normal leading-tight">{forecastText}</p>
        </div>
        <div className={`flex flex-[3] items-center gap-5 overflow-x-auto overflow-y-hidden px-[10px] scrollbar-hide ${panelClass}`}>
          {(data?.hourly.slice(0, 6) ?? Array.from({ length: 5 })).map((hour, index) => (
            <div key={data ? hour.time : index} className="w-[72px] shrink-0 text-center">
              <p className="text-[17px]">
                {data ? formatHour(hour.time, data.current.timezone) : "--"}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={androidIcon(data ? hour.icon : "01d")}
                alt=""
                className="mx-auto mt-1 size-[56px] object-contain"
              />
              <p className="mt-1 text-[18px]">
                {data ? `${hour.temp.toFixed(1)}℃` : "--.-℃"}
              </p>
            </div>
          ))}
        </div>
        <div className={`mt-px flex flex-1 items-center justify-center rounded-b-[12px] ${panelClass}`}>
          <p className="text-[27px] font-normal">{data?.location.name ?? "서울"} 날씨</p>
        </div>
      </section>
    </div>
  );
}

function DailyWeather({ data }: { data: WeatherPayload | null }) {
  return (
    <div className="h-full overflow-hidden p-[10px] pb-4">
      <div className="space-y-[1px]">
        {(data?.daily ?? []).map((day, index) => (
          <div
            key={day.date}
            className={`grid h-[106px] grid-cols-[82px_68px_1fr] items-center px-4 ${panelClass} ${
              index === 0 ? "rounded-t-[12px]" : ""
            } ${index === (data?.daily.length ?? 1) - 1 ? "rounded-b-[12px]" : ""}`}
          >
            <p className="text-[18px]">{formatDay(day.date)}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={androidIcon(day.icon)} alt="" className="size-[62px] object-contain" />
            <div className="text-right">
              <p className="text-[18px]">{day.description}</p>
              <p className="mt-1 text-[21px]">
                {day.min}℃ / {day.max}℃
              </p>
            </div>
          </div>
        ))}
        {!data ? (
          <div className={`rounded-[12px] p-6 text-[22px] ${panelClass}`}>
            API 키를 넣으면 5일 예보가 표시됩니다.
          </div>
        ) : null}
      </div>
    </div>
  );
}

function AirPollution({ data }: { data: WeatherPayload | null }) {
  const values = [
    {
      title: "미세먼지(PM 10)",
      value: data ? `${data.air.pm10}μg/m3` : "PM_10 Text",
      ranges: ["좋음(0~30μg/㎥)", "보통(31~80μg/㎥)", "나쁨(81~150μg/㎥)", "매우나쁨(150μg/㎥~)"],
    },
    {
      title: "미세먼지(PM 2.5)",
      value: data ? `${data.air.pm2_5}μg/m3` : "PM_2.5 Text",
      ranges: ["좋음(0~15μg/㎥)", "보통(16~35μg/㎥)", "나쁨(36~75μg/㎥)", "매우나쁨(76μg/㎥~)"],
    },
    {
      title: "일산화탄소",
      value: data ? `${data.air.co}μg/m3` : "CO Text",
      ranges: ["좋음~4400μg/㎥", "보통~9400μg/㎥", "나쁨~12400μg/㎥", "매우나쁨12400μg/㎥~"],
    },
    {
      title: "오존",
      value: data ? `${data.air.o3}μg/m3` : "O3 Text",
      ranges: ["좋음0~60μg/㎥", "보통60~100μg/㎥", "나쁨100~140μg/㎥", "매우나쁨140μg/㎥~"],
    },
  ];

  return (
    <div className="h-full overflow-hidden px-[10px] pt-[10px]">
      {values.map((item) => (
        <section key={item.title} className="mb-[8px]">
          <p className="mb-[6px] text-[20px]">{item.title}</p>
          <div className={`rounded-[12px] p-[9px] ${panelClass}`}>
            <p className="text-[21px]">{item.value}</p>
            <div className="mt-[10px] flex justify-center gap-[5px]">
              {item.ranges.map((range, index) => (
                <span
                  key={range}
                  className="flex h-[28px] items-center rounded-[2px] px-[6px] text-[10px]"
                  style={{ backgroundColor: ["#cc91d4ff", "#cc9fe78d", "#cce7bc8d", "#ccef8e8e"][index] }}
                >
                  {range}
                </span>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function EtcWeather({ data }: { data: WeatherPayload | null }) {
  const items = [
    ["일몰", data ? formatHour(data.current.sunset, data.current.timezone) : "--"],
    ["일출", data ? formatHour(data.current.sunrise, data.current.timezone) : "--"],
    ["풍향", data ? windDirection(data.current.windDeg) : "--"],
    ["풍속", data ? `${data.current.windSpeed}m/s` : "--"],
    ["강우량", data ? `${data.current.rain || data.current.snow}mm` : "--"],
    ["체감온도", data ? `${data.current.feelsLike}℃` : "--"],
    ["습도", data ? `${data.current.humidity}%` : "--"],
    ["가시거리", data ? `${Math.round(data.current.visibility / 1000)}km` : "--"],
    ["흐림도", data ? `${data.current.clouds}%` : "--"],
    ["대기압", data ? `${data.current.pressure}hPa` : "--"],
  ];

  return (
    <div className="h-full overflow-hidden p-[5px]">
      <div className="grid grid-cols-2 gap-[10px]">
        {items.map(([label, value]) => (
          <div
            key={label}
            className={`flex h-[104px] items-center justify-center rounded-[12px] text-center ${panelClass}`}
          >
            <p className="text-[20px] leading-tight">
              {label}
              <br />
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherEffect({
  data,
  backgroundIndex,
}: {
  data: WeatherPayload | null;
  backgroundIndex: number;
}) {
  const main = data?.current.condition.main.toLowerCase() ?? "";
  const effect = main.includes("rain") || main.includes("drizzle") ? "rain" : main.includes("snow") ? "snow" : null;
  const showShootingStar =
    !effect &&
    (backgroundIndex === 8 || backgroundIndex === 0) &&
    (data?.current.condition.main.toLowerCase() === "clear" ||
      data?.current.condition.icon.endsWith("n"));

  if (!effect && !showShootingStar) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {effect
        ? Array.from({ length: 28 }).map((_, index) => (
            <span
              key={index}
              className={`absolute left-[var(--x)] top-[-12%] block animate-[weather-fall_var(--d)_linear_infinite] ${
                effect === "rain" ? "h-10 w-px bg-white/70" : "size-2 rounded-full bg-white/85"
              }`}
              style={
                {
                  "--x": `${(index * 29) % 100}%`,
                  "--d": `${1.8 + (index % 6) * 0.28}s`,
                  animationDelay: `${index * 0.11}s`,
                } as CSSProperties
              }
            />
          ))
        : null}
      {showShootingStar ? (
        <>
          <span className="absolute right-[-64px] top-[13%] h-px w-32 rotate-[-12deg] animate-[shooting-star_6s_linear_infinite] bg-linear-to-l from-white via-white/80 to-transparent" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/weather-app-assets/line.webp"
            alt=""
            className="absolute right-[-72px] top-[9%] size-16 animate-[shooting-star_6s_linear_infinite] object-contain opacity-90"
          />
        </>
      ) : null}
    </div>
  );
}
