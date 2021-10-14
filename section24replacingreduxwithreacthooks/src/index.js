import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { combineReducers, createStore } from "redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
// import productReducer from "./store/reducers/products";

import ProductsProvider from "./context/products-context";

import configureProductsStore from "./hooks-store/products-store";

// const rootReducer = combineReducers({
//   shop: productReducer
// });

// const store = createStore(rootReducer);

configureProductsStore();

ReactDOM.render(
  // // 아래는 redux 사용시
  // <Provider store={store}>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </Provider>,
  // // 아래는 contextAPI 사용시
  // <ProductsProvider>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </ProductsProvider>,
  // customHook 컴포넌트를 사용시
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
