import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";

//만약 token이 없을땐 아예 특정라우터로 접근하지 못하게 해보자!!

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {/* 반대로 아래의 AuthPage 컴포넌트는 로긴이 안될때만 접근할 수 있도록 해야한다 */}
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {/* 아래의 profile컴포넌트는 토큰이 있을때만 사용할수 있도록 아래와 같이 제한한다. */}
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        {/* 그리고 위의 해당 사항이 아닐때 홈('/')으로 리다이렉트 처리 해준다! */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
