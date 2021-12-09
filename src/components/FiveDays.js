import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fiveDaysState } from "../recoil/atom/cityAtom";
import { useRecoilState } from "recoil";
const FiveDays = (props) => {
  const [fiveDays, setFiveDays] = useRecoilState(fiveDaysState);
  if (fiveDays.length > 0) {
    const link = `http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`;
    let date = new Date(props.data.dt_txt);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    let readableDate = date.toDateString();

    let temperature = props.data.main.temp - 273.15;
    temperature = Math.round(temperature);
    let feels_like = (props.data.main.feels_like - 273.15) * 10;
    feels_like = Math.round(feels_like);
    feels_like = feels_like / 10;

    return (
      <Link
        to={`/Day/${day}/${month}/${year}`}
        style={{ textDecoration: "none" }}
      >
        <Card className="my-3 p-3 rounded">
          <ListGroupItem>{readableDate}</ListGroupItem>
          <Card.Img variant="top" src={link} />
          <Card.Body>
            <Card.Title>
              {" "}
              <Card.Title>
                {" "}
                {props.data.weather[0].main} <span> {temperature}°</span>
              </Card.Title>
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{props.data.weather[0].description}</ListGroupItem>
            <ListGroupItem>Temperature: {temperature}°</ListGroupItem>
            <ListGroupItem>Feels like : {feels_like}°</ListGroupItem>
            <ListGroupItem>
              Wind Speed : {props.data.wind.speed} km
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Link>
    );
  } else {
    return <p>Data not loaded yet</p>;
  }
};

export default FiveDays;
