import { Form, Button } from "react-bootstrap";
// import SingleCity from "./SingleCity";
// import MainCity from "./MainCity";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { it } from "date-fns/locale";

// const newYork = [40.700494406032185, -74.03393769328348];
// const roma = [41.86556867816433, 12.487018671109787];
// const londra = [51.50553349194901, -0.13185418958163353];
// const madrid=[40.41797508337358, -3.7035809840811256]
// const oslo=[59.91096888855192, 10.748716361596463]
const SearchBar = (props) => {
  const [cityName, setCityName] = useState(`roma`);
  // const [name, setName] = useState(`roma`);

  const navigate = useNavigate();

  const goTo = () => {
    navigate("/maincity");
  };
  const ghost = (e) => {
    e.preventDefault();
    props.setCity(cityName);
    const input = document.getElementsByClassName(`formInput`);
    input[0].value = ``;
    goTo();
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <p className="fs-5 text-light mb-0 mt-5">
          <span className="fs-5">
            {format(new Date(), `eeee d LLL, HH:mm`, { locale: it })}
          </span>
          {/* <span className="ms-2">{format(new Date(), `HH:mm`)}</span>  */}
        </p>
      </div>
      <Form
        onSubmit={ghost}
        className="d-flex justify-content-center align-items-center my-3"
      >
        <Form.Group
          className=" w-30 d-flex align-items-center"
          controlId="formBasicEmail"
        >
          <Form.Control
            required
            type="text"
            onChange={(e) => {
              setCityName(e.target.value);
            }}
            placeholder="Scegli una citta'"
            className="formInput"
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Cerca
        </Button>
      </Form>
      {/* <Container fluid>
        <Row className="d-flex justify-content-center">
          <Col sm={6} className="d-flex justify-content-center my-5">
            <SingleCity lat={newYork[0]} lon={newYork[1]} />
          </Col>
          <Col sm={6} className="d-flex justify-content-center my-5">
            <SingleCity lat={londra[0]} lon={londra[1]} />
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default SearchBar;
