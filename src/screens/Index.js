import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FetchDataFromAPI from "../components/FetchDataFromAPI";
import { useRecoilState } from "recoil";
import { searchWeatherState } from "../recoil/atom/cityAtom";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";

import {
  cityState,
  fiveDaysState,
  weatherState,
  searchedCityState,
  locationWetherState,
  lOneDayState,
  sOneDayState,
} from "../recoil/atom/cityAtom";
import LocationData from "../components/LocationData";
import SearchData from "../components/SearchData";

const Index = () => {
  const [cityInput, setCityInput] = useState("London");
  const [searchedCity, setSearchedCity] = useRecoilState(searchedCityState);

  const [lWeather, setLWeather] = useRecoilState(locationWetherState);
  const [lOneDay, setLOneDay] = useRecoilState(lOneDayState);
  const [sOneDay, setSOneDay] = useRecoilState(sOneDayState);

  const [fiveDays, setFiveDays] = useRecoilState(fiveDaysState);

  const handelChange = (e) => {
    setCityInput(e.target.value);
  };
  const handelClick = () => {
    setSearchedCity(cityInput);
  };
  const form = (_) => {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Ther City Name"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          onChange={handelChange}
        />
        <button
          onClick={handelClick}
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Search
        </button>
      </div>
    );
  };

  return (
    <Container>
      <FetchDataFromAPI />
      {form()}
      <Row>
        <LocationData data={lOneDay} />
        <SearchData data={sOneDay} />
      </Row>
    </Container>
  );
};

export default Index;
