import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  cityState,
  fiveDaysState,
  weatherState,
  searchWeatherState,
  searchedCityState,
  locationWetherState,
  lOneDayState,
  sOneDayState,
  sWeatherState,
} from "../recoil/atom/cityAtom";
import { Col, Row, Container } from "react-bootstrap";
import GetLocation from "./GetLocation";
import Index from "../screens/Index";

const key = "478f1611be4e3a210abc53f2b1c9e8d4";
const FetchDataFromAPI = () => {
  const [weather, setWeather] = useRecoilState(weatherState);
  const [searchedCity, setSearchedCity] = useRecoilState(searchedCityState);
  // const [sWeather, setSWeather] = useRecoilState(searchWeatherState);
  const [lWeather, setLWeather] = useRecoilState(locationWetherState);
  const [sWeather, setSWeather] = useRecoilState(sWeatherState);
  const [city, setCity] = useRecoilState(cityState);
  const [fiveDays, setFiveDays] = useRecoilState(fiveDaysState);
  const [lOneDay, setLOneDay] = useRecoilState(lOneDayState);
  const [sOneDay, setSOneDay] = useRecoilState(sOneDayState);

  let link = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;

  const locationLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  const searchedLink = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${key}`;

  ////////////////////Fetch Data

  const sendReq = async () => {
    if (window.location.pathname == "/") {
      if ((city != "", city != "undefined")) {
        const locationWeather = await axios.get(locationLink);
        if (lWeather == "") {
          setLWeather(locationWeather);
          console.log("lWeather not added yet");
        } else {
          setLOneDay(lWeather.data);
        }
      } else {
        return console.log("City Not loaded Yet from location weather one Day");
      }

      //Get data for location city

      if (searchedCity != "") {
        // Get data for searched City

        const xd = await axios.get(searchedLink);
        setSWeather(xd);
        console.log(sWeather, "sWeather");
        if (xd == "") {
          // console.log("SWeather not added yet");
        } else {
          setSOneDay(xd.data);
        }
      } else {
        return console.log("City Not loaded Yet from location weather one Day");
      }
    } else if (window.location.pathname == "/DisplayFiveDays/1") {
      const weatherData = await axios.get(link);
      setWeather(weatherData);
    } else if (window.location.pathname == `/DisplayFiveDays/${searchedCity}`) {
      link = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${key}`;

      const weatherData = await axios.get(link);
      setWeather(weatherData);
      // console.log(
      //   "ParisParisParisParisParisParisParisParisParisParisParisParisParis"
      // );
    }
  };

  const fetchData = () => {
    if (typeof city == "undefined" || city == "") {
      console.log("no city selected");
    } else {
      sendReq();

      let tempArr = [];
      if (weather == "recoil" || typeof weather == undefined) {
        console.log("City Nane  not loaded yet *");
      } else {
        let iterator = weather.data.list;

        for (let i = 0; i < iterator.length; i += 8) {
          tempArr.push(iterator[i]);
        }
        setFiveDays(tempArr);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [city, searchedCity]);

  return (
    <Container>
      <GetLocation />
      <Row>
        {/* {fiveDays.map((data) => (
          <Col key={data.dt_txt}>
            // <DisplayData dat**a={data} />
          </Col>
        ))} */}
      </Row>
    </Container>
  );
};

export default FetchDataFromAPI;
