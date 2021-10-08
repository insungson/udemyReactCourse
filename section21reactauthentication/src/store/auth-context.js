import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// 로그인 상태를 지속하기 위해서 localStorage와 cookie 가 있다.
//https://academind.com/tutorials/localstorage-vs-cookies-xss
// 위에서 좀더 살펴보자!!
//여기선 localStorage 를 사용할 것이다. (localStorage는 Cross-site Scripting attacks 에 약하다)

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); //이건 현재 시간
  const adjExpirationTime = new Date(expirationTime).getTime(); //이건 미래 expire할 시간

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const initalToken = localStorage.getItem("token");
  const [token, setToken] = useState(initalToken);
  //만약 토큰이 없어 undefine일땐 이렇게 처리한다.
  //localStorage 는 동기적 APU이기 때문에 가능하다!!

  const userIsLoggedIn = !!token; //토큰의 유무로 판단! true, false로 처리

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token"); //삭제시 key 를 넣어 삭제처리한다.
  };

  //자동 로그아웃처리를 위해 expirationTime 인풋값을 추가하자
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    // localStorage 는 자바스크립트 내장함수이다.
    localStorage.setItem("token", token); //key, value로 넣는다.

    const remainingTime = calculateRemainingTime(expirationTime);

    //setTimeout 으로 remainingTime 후에 logout 메서드를 실행시키면 된다!
    setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
