import React from "react";
import { Route } from "react-router-dom";

import Navigation from "./components/Nav/Navigation";
import ProductsPage from "./containers/Products";
import FavoritesPage from "./containers/Favorites";

//FavoritesPage ProductsPage  2개의 컴포넌트에서 데이터를 관리하므로 redux를 사용했다.
// redux가 아닌 2개의 다른 방법으로 이번 프로젝트에서 광역적인 데이터 관리를 해보자
// 1) context API
// 2) customHook as a store
const App = (props) => {
  return (
    <React.Fragment>
      <Navigation />
      <main>
        <Route path="/" component={ProductsPage} exact />
        <Route path="/favorites" component={FavoritesPage} />
      </main>
    </React.Fragment>
  );
};

export default App;
