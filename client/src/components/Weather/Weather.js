import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { UserContext, UserProvider } from "../../utils/UserContext";
import { useContext } from "react";

const WeatherCard = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Gets the users location and then fetches the weather data from the API
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLong(longitude);

        fetch(
          `https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=imperial&APPID=42bd4df4c8216e16be280cf95790436b`
        )
          .then((res) => res.json())
          .then((result) => {
            setData(result);
            // console.log(result);
          });
      });
    };

    fetchData();
  }, []);

  return (
    <>
      {data.name && (
        <Card className="weather">
          <Card.Body>
            <Card.Text>
              <div>
              <span style={{ fontSize: "2rem" }}>
                {data.name}
              </span>
              <p>Temperature: {data.main.temp}°F</p>
              <p>Feels like: {data.main.feels_like}°F</p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Wind: {data.wind.speed}m/s</p>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default WeatherCard;
