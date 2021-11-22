import Header from "../parts/Header";
import Hero from "../parts/Hero";
import Content from "../parts/Content";
import Footer from "../parts/Footer";
import { useLocation, useHistory } from "react-router-dom";
import React, { useRef } from 'react';

export default function LandingPage() {
  var object = {};
  object.location = useLocation();
  let history = useHistory();
  const contactRef = useRef()

  return (
    <div>
      <Header {...object} contactRef={contactRef} />
      <Hero />
      <Content />
      <Footer contactRef={contactRef} />
    </div>
  );
}
