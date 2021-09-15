import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./index.css";
import App from "./App";

//context 의 provider 처럼 wrapper로 감싸고 store에서 설정하여
//아래와 같이 store 속성에 넣으면 된다.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
