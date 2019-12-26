import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./src/containers/redux";
import Home from "./home";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
