import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  const ctx = useContext(AuthContext);

  //아래와 같이 <AuthContext.Consumer> 컴포넌트를 사용하고 그 내부에서 (ctx) => {return()}
  //이렇게 consumer 형태로 접근해도 되지만.. 위와 같이 useContext를 사용하면 리턴 랜더링부분이 좀더 간결해진다.
  return (
    // <AuthContext.Consumer>
    //   {(ctx) => {
    //     return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={ctx.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
    //     );
    //   }}
    // </AuthContext.Consumer>
  );
};

export default Navigation;
