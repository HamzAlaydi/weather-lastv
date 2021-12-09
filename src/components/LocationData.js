import React from "react";
import { useRecoilState } from "recoil";
import { cityState, lOneDayState, sOneDayState } from "../recoil/atom/cityAtom";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// if (props.data.weather.length > 0 && props.data.weather !== "undefined") {
//   return (
//     <div>
//       <p>SearchData</p>
//     </div>
//   );
// } else {
//   return <p>Waiting Data</p>;
// }
const SearchData = (props) => {
  const [lOneDay, setLOneDay] = useRecoilState(lOneDayState);
  const [sOneDay, setSOneDay] = useRecoilState(sOneDayState);
  const [city, setCity] = useRecoilState(cityState);

  if (lOneDay.dt) {
    const link = `http://openweathermap.org/img/wn/${lOneDay.weather[0].icon}@2x.png`;

    let date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    let readableDate = date.toDateString();

    let temperature = lOneDay.main.temp - 273.15;
    temperature = Math.round(temperature);
    let feels_like = (lOneDay.main.feels_like - 273.15) * 10;
    feels_like = Math.round(feels_like);
    feels_like = feels_like / 10;
    return (
      <Col>
        <Link to={`/DisplayFiveDays/${city}`}>
          <Row xs={1} md={2} className="g-4">
            {console.log(lOneDay.name)}
            {Array.from({ length: 1 }).map((_, idx) => (
              <Col>
                <Card style={{ marginTop: "40px" }}>
                  <ListGroupItem>{readableDate}</ListGroupItem>
                  <Card.Title style={{ marginLeft: "15px" }}>
                    {lOneDay.name} <span> City</span>
                  </Card.Title>
                  <Card.Img variant="top" src={link} />

                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Card.Title style={{ marginLeft: "0px" }}>
                        {lOneDay.weather[0].main} <span> {temperature}°</span>
                      </Card.Title>
                      {lOneDay.weather[0].description}
                    </ListGroupItem>
                    <ListGroupItem>Temperature: {temperature}°</ListGroupItem>
                    <ListGroupItem>Feels like : {feels_like}°</ListGroupItem>
                    <ListGroupItem>
                      Wind Speed : {lOneDay.wind.speed} km
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
    return <p>not Loaded yet</p>;
  }
};

export default SearchData;
