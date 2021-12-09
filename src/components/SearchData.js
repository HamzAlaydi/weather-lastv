import React from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  cityState,
  searchedCityState,
  sOneDayState,
} from "../recoil/atom/cityAtom";

const LocationData = () => {
  const [city, setCity] = useRecoilState(cityState);
  const [searchedCity, setSearchedCity] = useRecoilState(searchedCityState);

  const [sOneDay, setSOneDay] = useRecoilState(sOneDayState);
  if (sOneDay.dt) {
    const link = `http://openweathermap.org/img/wn/${sOneDay.weather[0].icon}@2x.png`;

    let date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    let readableDate = date.toDateString();

    let temperature = sOneDay.main.temp - 273.15;
    temperature = Math.round(temperature);
    let feels_like = (sOneDay.main.feels_like - 273.15) * 10;
    feels_like = Math.round(feels_like);
    feels_like = feels_like / 10;
    return (
      <Col>
        <Link to={`/DisplayFiveDays/${searchedCity}`}>
          <Row xs={1} md={2} className="g-4">
            {console.log(sOneDay.name)}
            {Array.from({ length: 1 }).map((_, idx) => (
              <Col>
                <Card style={{ marginTop: "40px" }}>
                  <ListGroupItem>{readableDate}</ListGroupItem>
                  <Card.Title style={{ marginLeft: "15px" }}>
                    {sOneDay.name} <span> City</span>
                  </Card.Title>
                  <Card.Img variant="top" src={link} />

                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Card.Title style={{ marginLeft: "0px" }}>
                        {sOneDay.weather[0].main} <span> {temperature}°</span>
                      </Card.Title>
                      {sOneDay.weather[0].description}
                    </ListGroupItem>
                    <ListGroupItem>Temperature: {temperature}°</ListGroupItem>
                    <ListGroupItem>Feels like : {feels_like}°</ListGroupItem>
                    <ListGroupItem>
                      Wind Speed : {sOneDay.wind.speed} km
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            ))}
          </Row>
        </Link>
      </Col>
    );
  } else {
    return <div> not Entered yet </div>;
  }
};
export default LocationData;
