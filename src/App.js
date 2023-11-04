import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/personal.css";
import Home from "./Component/Home";
import CustomNavbar from "./Component/CustomNavbar";
import Footer from "./Component/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainCity from "./Component/MainCity";
import { useState } from "react";
import SearchBar from "./Component/SearchBar";

function App() {
  const [cityName, setCityName] = useState();

  const setCity = (val) => {
    setCityName(val);
  };

  return (
    <div id="app" className="bg-primaryq">
      <BrowserRouter>
        <CustomNavbar />
        <SearchBar setCity={setCity} />
        <Routes>
          <Route element={<Home/>} path="*" />
          <Route element={<MainCity cityName={cityName} />} path="/maincity" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
