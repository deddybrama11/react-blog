import Header from "../parts/Header";
import Hero from "../parts/Hero";
import Content from "../parts/Content";
import Footer from "../parts/Footer";
import { useLocation, useHistory } from "react-router-dom";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

export default function LandingPage() {
  var object = {};
  object.location = useLocation();
  let history = useHistory();

  return (
    <div>
      <Header {...object} />
      <Hero />
      <Content />
      <Footer />
    </div>
  );
}
