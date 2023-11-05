import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { BsThermometerSnow, BsThermometerSun } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";
const apiKey = `01929813c6bea4249187f26bf743df18`;
const MainCity = (props) => {
  const cityName = props.cityName;
  const [meteo, setMeteo] = useState({});
  const [ok, setOk] = useState(false);
  const [ok1, setOk1] = useState(false);
  const [alert1, setAlert1] = useState(false);
  const [days, setDays] = useState({});
  const [allerta2, setAllerta2] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [cityHour, setCityhour] = useState();

  const getMeteo = async () => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=it&appid=${apiKey}`
      );
      if (response.ok) {
        const meteoData = await response.json();
        console.log(meteoData);
        setMeteo(meteoData);
        setTimeout(() => setOk(true), 200);
        get5Day(meteoData.coord.lat, meteoData.coord.lon);
        setAlert1(false);
        setAllerta2(false);

        setTimeout(() => setSpinner(false), 200);

        let e = meteoData.timezone;
        let c = (e - 3600) * 1000;
        const d = new Date().getTime();
        const f = c + d;
        const cityTimeH = format(new Date(f), `HH:mm`);
        setCityhour(cityTimeH);
      } else {
        setTimeout(() => setAlert1(true), 200);
        setOk(false);
        setTimeout(() => setSpinner(false), 200);

        // throw new Error(`errore nella response del meteo`);
      }
    } catch (error) {
      setTimeout(() => setAllerta2(true), 200);
      setOk(false);
      setTimeout(() => setSpinner(false), 200);
    }
  };
  const get5Day = async (lat, lon) => {
    try {
      let response1 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=01929813c6bea4249187f26bf743df18`
      );
      if (response1.ok) {
        const data1 = await response1.json();
        console.log(data1, `array`);
        setDays(data1);
        setTimeout(() => setOk1(true), 200);
        setAlert1(false);
        setAllerta2(false);
        setTimeout(() => setOk1(true), 200);
        setTimeout(() => setSpinner(false), 200);
      } else {
        throw new Error(`errore nella response del meteo`);
      }
    } catch (error) {
      setTimeout(() => setAllerta2(true), 200);

      setOk(false);
      setTimeout(() => setSpinner(false), 200);
    }
  };

  useEffect(() => {
    setOk(false);
    setOk1(false);
    setSpinner(true);
    getMeteo();
    // get5Day();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cityName]);

  return (
    <>
      {ok === false && ok1 === false && spinner && alert1 === false && (
        <Spinner
          className="spinner position-absolute top-50 start-50"
          animation="border"
          variant="secondary"
        />
      )}
      {allerta2 && <Alert>Errore nel recupero dati dalla fetch</Alert>}
      {alert1 && (
        <Alert>
          Attenzione! La citta selezionata non esiste! cercane una esistente
        </Alert>
      )}

      {ok && ok1 && (
        <div id="mainCity">
          <Container fluid>
            <Row className="dd">
              <Col className="col-12  d-flex justify-content-around heigthCol flex-column">
                <div
                  className="text-white w-100 d-flex flex-column align-items-center justify-content-around h-100"
                  id=""
                >
                  <div className="d-flex align-items-center text-white">
                    {ok && (
                      <img
                        src={`http://openweathermap.org/img/w/${meteo.weather[0].icon}.png`}
                        alt=""
                        width={100}
                      />
                    )}
                    {ok && (
                      <h3 className="display-1 mb-0 ms-3 fw-bold">
                        {meteo.name}{" "}
                        <span className="fs-4">({meteo.sys.country})</span>
                      </h3>
                    )}
                  </div>
                  {ok && (
                    <h3 className="mb-0">
                      a {meteo.name} sono le {cityHour} (ora locale)
                    </h3>
                  )}
                  {ok && (
                    <div>
                      <div
                        className="display-2 mb-0 d-flex align-items-baseline"
                        id="coll"
                      >
                        <span className="">
                          {meteo.weather[0].description
                            .slice(0, 1)
                            .toUpperCase()}
                          {meteo.weather[0].description.slice(1)}
                        </span>
                        <div className="d-flex align-items-center ms-5    me-2">
                          {ok && (
                            <p className="mb-0 display-5">
                              T {meteo.main.temp}°
                            </p>
                          )}
                        </div>
                        {meteo.rain && (
                          <span className="fs-6">
                            {meteo.rain[`1h`]} ml di pioggia nell'ultima ora
                          </span>
                        )}
                        {/* {meteo.rain[`3h`] && (
                          <span className="fs-6">
                            {meteo.rain[`3h`]}ml di pioggia nelle ultime 3 ore
                          </span>
                        )} */}
                      </div>
                    </div>
                  )}

                  <Row className="w-100 justify-content-center">
                    <Col className="col-12 col-md-4 d-flex flex-column align-items-center">
                      <div className="d-flex flex-column align-items-start">
                        {/* <div className="fs-2 me-2 d-flex flex-column w-100 align-items-center"> */}
                        <div className="d-flex flex-column align-items-start ">
                          {ok && (
                            <p className="fs-2 mb-0">
                              <BsThermometerSun className="red mb-1" />T max{" "}
                              {meteo.main.temp_max}°
                            </p>
                          )}

                          {ok && (
                            <p className="fs-2 mb-0">
                              <BsThermometerSnow className="blue mb-1" />T min{" "}
                              {meteo.main.temp_min}°
                            </p>
                          )}
                        </div>
                        {/* </div> */}
                      </div>
                    </Col>
                    <Col className=" col-12 col-md-4 d-flex flex-column align-items-center">
                      <div className="fs-2 me-2 d-flex flex-column align-items-start ">
                        <div className="d-flex flex-column align-items-center">
                          {ok && (
                            <p className="mb-0">
                              {" "}
                              Umidita' {meteo.main.humidity}%
                            </p>
                          )}
                          {ok && (
                            <p className="mb-0">
                              pressione {meteo.main.pressure} bar
                            </p>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col className=" col-12 col-md-4 d-flex flex-column align-items-center">
                      <div className="fs-2 me-2 d-flex flex-column align-items-start ">
                        <div className="d-flex flex-column align-items-center">
                          {ok && (
                            <p className="mb-0">
                              {" "}
                              venti {meteo.wind.speed} km/h
                            </p>
                          )}
                          {ok && (
                            <p className="mb-0">
                              lat {meteo.coord.lat} lon {meteo.coord.lon}
                            </p>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
          <Container fluid id="underSection">
            <Row className="flex-nowrap mt-4 pb-0" id="scrollRow">
              {ok1 &&
                days.list.slice().map((item, i) => {
                  return (
                    <Col
                      key={i}
                      className="col-md-3 col-sm-6 col-12 border  border-1 border-black py-2 "
                      id="colScroll"
                    >
                      <div className="d-flex flex-column align-items-center position-relative">
                        <p className="mb-0 text-white">
                          {item.dt_txt.slice(5, 10)} alle{" "}
                          {item.dt_txt.slice(-8, -3)}
                        </p>
                        <div id="box" className="">
                          <img
                            src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                            alt=""
                            width={130}
                            id="img2"
                          />
                        </div>
                        <p className="mb-0 text-white">{item.main.temp}°</p>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default MainCity;
