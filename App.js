import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./src/containers/store";
import Home from "./components/home";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
