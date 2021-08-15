import React, { Component } from "react";
import Header from "../parts/Header";
import Hero from "../parts/Hero";
import Content from "../parts/Content";
import landingPage from "json/landingPage.json";
import Footer from "../parts/Footer";

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.refMostPicked = React.createRef();
  }
  componentDidMount() {
    window.title = "Mize | Blog";
    window.scrollTo(0, 0);
  }

  // state = {  }
  render() {
    return (
      <>
        <Header {...this.props} />
        <Hero />
        <Content data={landingPage.articles}/>
        <Footer/>
      </>
    );
  }
}

export default LandingPage;
