import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

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

// 아래는 토큰의 남은시간을 계산해주는 함수이다.
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); //이건 현재 시간
  const adjExpirationTime = new Date(expirationTime).getTime(); //이건 미래 expire할 시간

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

//아래의 함수는 토큰 시간이 남아있을땐.. 토큰과 남은 시간을 리턴해주고 없을땐 null 값을 리턴한다.
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) { //1분
    //로컬스토리지에 토큰과 expirationTime 을 삭제한다.
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  //위에서 만든 함수(토큰데이터의 생성주기)를 아래에서 가져온다.
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;

  }

  const [token, setToken] = useState(initialToken);
  //만약 토큰이 없어 undefine일땐 이렇게 처리한다.
  //localStorage 는 동기적 APU이기 때문에 가능하다!!

  const userIsLoggedIn = !!token; //토큰의 유무로 판단! true, false로 처리

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token"); //삭제시 key 를 넣어 삭제처리한다.
    localStorage.removeItem('expirationTime'); //역시 로그아웃시 이것도 없애자.

    // logoutTimer 변수에 setTimeout 을 넣고 여기서 로그아웃을 할때 
    // 해당 setTimeout을 처리해준다.
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  //자동 로그아웃처리를 위해 expirationTime 인풋값을 추가하자
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    // localStorage 는 자바스크립트 내장함수이다.
    localStorage.setItem("token", token); //key, value로 넣는다.
    localStorage.setItem('expirationTime', expirationTime); // expirationTime 에 대한 값을 넣는다.

    const remainingTime = calculateRemainingTime(expirationTime);

    //setTimeout 으로 remainingTime 후에 logout 메서드를 실행시키면 된다!
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log('tokenData.duration: ', tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration); 
    }
  }, [tokenData, logoutHandler]);

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
