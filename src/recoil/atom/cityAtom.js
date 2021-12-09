import { atom } from "recoil";

export const cityState = atom({
  key: "cityName",
  default: "gaza",
});
export const weatherState = atom({
  key: "weather",
  default: "recoil",
});

export const searchedCityState = atom({
  key: "searchedCity",
  default: "Paris",
});

export const searchWeatherState = atom({
  key: "searchWeatherState",
  default: "",
});

export const locationWetherState = atom({
  key: "locationWetherState",
  default: "",
});
export const sWeatherState = atom({
  key: "sWeatherState",
  default: "",
});

export const lOneDayState = atom({
  key: "lOneDayState",
  default: [],
});

export const sOneDayState = atom({
  key: "SOneDayState",
  default: [],
});

export const fiveDaysState = atom({
  key: "fiveDaysState",
  default: [],
});
