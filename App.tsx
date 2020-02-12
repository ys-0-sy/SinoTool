import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/configureStore";
import Home from "./src/pages/home";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
