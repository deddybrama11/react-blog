import React, { Component } from "react";
import Header from "../parts/Header";
import Hero from "../parts/Hero";

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
        <Hero/>
      </>
    );
  }
}

export default LandingPage;
