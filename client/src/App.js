import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Home from "./pages/pagesections/Home";
import Crypto from "./pages/pagesections/Crypto";
import CryptoConvert from "./pages/CryptoConvert";
import useIntersectionObserver from "./utils/useIntersectionObserver";
import { useDispatch } from "react-redux";
import { navbarActions } from "./store/navbarSlice";
import About from "./pages/pagesections/About";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
  }, []);

  const dispatch = useDispatch();
  const timeoutRef = useRef(null);

  const handleIntersection = (id) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(
        navbarActions.setSelected(id.charAt(0).toUpperCase() + id.slice(1))
      );
    }, 300);
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  };

  const homeRef = useIntersectionObserver(
    () => handleIntersection("home"),
    options
  );
  const cryptoRef = useIntersectionObserver(
    () => handleIntersection("crypto"),
    options
  );
  const aboutRef = useIntersectionObserver(
    () => handleIntersection("about"),
    options
  );

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <div id="home" ref={homeRef}>
                  <Home />
                </div>
                <div id="crypto" ref={cryptoRef}>
                  <Crypto />
                </div>
                <div id="about" ref={aboutRef}>
                  <About />
                </div>
              </>
            }
          />
          <Route path="/cryptoconverter" element={<CryptoConvert />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
