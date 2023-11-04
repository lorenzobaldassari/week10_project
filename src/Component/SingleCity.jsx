import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { BsThermometerSnow, BsThermometerSun } from "react-icons/bs";

const apiKey = `01929813c6bea4249187f26bf743df18`;

const SingleCity = (props) => {
  const lat = props.lat;
  const lon = props.lon;
  const [meteo, setMeteo] = useState({});
  const [ok, setOk] = useState(false);

  const getMeteo = async () => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${apiKey}`
      );
      if (response.ok) {
        const meteoData = await response.json();
        // console.log(meteoData);
        // console.log(meteoData.main.temp);
        setMeteo(meteoData);
        setOk(true);
      } else {
        throw new Error(`errore nella response del meteo`);
      }
    } catch (error) {
      alert(`errore`, error);
    }
  };

  useEffect(() => {
    getMeteo();
  }, [props]);

  return (
    <>
      {/* <h2>ciao</h2> */}
     
        <div className="text-white">
          <div className="d-flex align-items-center text-white">
            {ok && (
              <img
                src={`http://openweathermap.org/img/w/${meteo.weather[0].icon}.png`}
                alt=""
                width={80}
              />
            )}

            <h3 className="display-4 mb-0 ms-3 fw-bold">{meteo.name}</h3>
          </div>
          {ok && (
            <p className="fs-2 mb-0">
              {new Date().getHours()}:{new Date().getMinutes()}
              <span className="ms-4">
                {meteo.weather[0].description.slice(0, 1).toUpperCase()}
                {meteo.weather[0].description.slice(1)}
              </span>
            </p>
          )}
          <div className="d-flex">
            <div className="d-flex align-items-center   fs-4 me-2">
              {ok && (
                <p className="mb-0">Temperatura {meteo.main.temp}°</p>
              )}
            </div>
            <div className="ms-2">
              {ok && (
                <p className="fs-6 mb-0">
                  <BsThermometerSun className="red mb-1" />
                  T max {meteo.main.temp_max}°
                </p>
              )}

              {ok && (
                <p className="fs-6 mb-0">
                  <BsThermometerSnow className="blue mb-1" />
                  T min {meteo.main.temp_min}°
                </p>
              )}
            </div>
          </div>
        </div>
     
    </>
  );
};

export default SingleCity;
