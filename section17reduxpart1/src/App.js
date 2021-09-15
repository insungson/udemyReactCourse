import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import { Fragment } from "react";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Fragment>
      <Header />
      {isLoggedIn ? <UserProfile /> : <Auth />}
      <Counter />
    </Fragment>
  );
}

export default App;
