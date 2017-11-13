import React from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import Container from "./components/container";
import store, { history } from "./redux/store";

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Container />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
