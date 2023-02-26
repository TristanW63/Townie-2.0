import React, { useEffect, useState} from 'react';
// import './styles.css';
// import moment from 'moment';
import { Card } from 'react-bootstrap'

const WeatherCard = () => {
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          navigator.geolocation.getCurrentPosition(function(position) {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLong(longitude);
      
            fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=42bd4df4c8216e16be280cf95790436b`)
              .then(res => res.json())
              .then(result => {
                setData(result)
                console.log(result);
              });
          });
        }
      
        fetchData();
      }, []);
      

    return (
        <>
        {data.name && (
            <Card className="weather">
                <Card.Body>
                    <Card.Title>Local Weather</Card.Title>
                    <Card.Text>
                        City: {data.name}
                        <p>Temperature: {data.main.temp}°C</p>
                        <p>Feels like: {data.main.feels_like}°C</p>
                        <p>Humidity: {data.main.humidity}%</p>
                        <p>Wind: {data.wind.speed}m/s</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        )}
        
        </>
);
    }

export default WeatherCard;