// import { format } from "date-fns";
import { useEffect, useState } from "react";
import {Alert, Col, Container, Row } from "react-bootstrap";
import { BsThermometerSnow, BsThermometerSun } from "react-icons/bs";

const apiKey = `01929813c6bea4249187f26bf743df18`;
// const array = [34.01885023896022, -5.00595559750036];

const MainCity = (props) => {
  const cityName = props.cityName;
  const [meteo, setMeteo] = useState({});
  const [ok, setOk] = useState(false);
  const [ok1, setOk1] = useState(false);
  const[alert1,setAlert1]= useState(false)
  const [days, setDays] = useState({});

  const getMeteo = async () => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=it&appid=${apiKey}`
      );
      if (response.ok) {
        const meteoData = await response.json();
        console.log(meteoData);
        setMeteo(meteoData);
        setOk(true);
        get5Day(meteoData.coord.lat, meteoData.coord.lon);
        setAlert1(false)
      } else {
        setAlert1(true)
        setOk(false)
        // throw new Error(`errore nella response del meteo`);
      }
    } catch (error) {
      // alert(error)
    }
  };
  const get5Day = async (lat, lon) => {
    try {
      let response1 = await fetch(
        // `api.openweathermap.org/data/2.5/forecast?lat=${array[0]}&lon=${array[1]}&units=metric&lang=it&appid=${apiKey}`
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=01929813c6bea4249187f26bf743df18`
        // `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=it&appid=${apiKey}`
      );
      if (response1.ok) {
        const data1 = await response1.json();
        console.log(data1, `array`);
        const date = new Date();
        console.log(date);
        // console.log(meteoData.main.temp);
        setDays(data1);
        setOk1(true);
      } else {
        throw new Error(`errore nella response del meteo`);
      }
    } catch (error) {
      
      alert(`errore`, error);
    }
  };

  useEffect(() => {
    getMeteo();
    // get5Day();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cityName]);
  // useEffect(()=>{
  // },[])

  return (
    <>
    {alert1&& <Alert>Attenzione! La citta selezionata non esiste! cercane una esistente</Alert>}
    
      {ok && (
        <div>
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
                    <div>

                    <div className="display-2 mb-0 d-flex align-items-baseline">
                      <span className="">
                        {meteo.weather[0].description.slice(0, 1).toUpperCase()}
                        {meteo.weather[0].description.slice(1)}
                      </span>
                      <div className="d-flex align-items-center ms-5    me-2">
                        {ok && (
                          <p className="mb-0 display-5">T {meteo.main.temp}°</p>
                          )}
                      </div>
                    </div>
                      {/* {meteo.rain[`1h`] && meteo.rain[`3h`]===undefined &&<span className="">{meteo.rain[`1h`]} ml di pioggia nell'ultima ora</span>}
                       { meteo.rain[`3h`]&&<span>{meteo.rain[`3h`]}ml di pioggia nelle ultime 3 ore</span>} */}
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
          <Container fluid>
            <Row className="flex-nowrap mt-4" id="scrollRow">
              {ok1 &&
                days.list.slice().map((item, i) => {
                  return (
                    <Col
                      key={i}
                      className="col-md-3 col-6 border border-top-0 border-bottom-0 border-1 border-black py-2"
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