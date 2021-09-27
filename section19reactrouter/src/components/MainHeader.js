import { Link, NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  //Link 와 달리 NavLink 는 active css 를 클래스로 먹일 수 있다.
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/welcome">
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/products">
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
