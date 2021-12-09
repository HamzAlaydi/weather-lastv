import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  fiveDaysState,
  cityState,
  searchedCityState,
} from "../recoil/atom/cityAtom";
import { Row, Container, Col } from "react-bootstrap";
import FetchDataFromAPI from "../components/FetchDataFromAPI";
import FiveDays from "../components/FiveDays";
const DisplayData = (props) => {
  const [fiveDays, setFiveDays] = useRecoilState(fiveDaysState);
  const [city, setCity] = useRecoilState(cityState);
  const [searchedCity, setSearchedCity] = useRecoilState(searchedCityState);

  return (
    <Container>
      <FetchDataFromAPI />
      <h3>You Choose {searchedCity} City</h3>
      <Row>
        {fiveDays.map((data) => {
          return (
            <Col key={data.weather[0].id}>
              {console.log(data)}
              {console.log(fiveDays.length)}
              <Row>
                <FiveDays data={data} />
              </Row>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default DisplayData;
