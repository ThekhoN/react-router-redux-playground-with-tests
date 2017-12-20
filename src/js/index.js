import React from "react";
import ReactDOM from "react-dom"
import { connect, Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import Container from "./components/container";
import store, { history } from "./redux/store";

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Component />
            </ConnectedRouter>
        </Provider>,
        document.getElementById("root")
    );
};

// render(
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <Container />
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById("root")
// );

render(Container);

if(module.hot){
	module.hot.accept("./components/container", () => {
		render(Container)
	})
}

