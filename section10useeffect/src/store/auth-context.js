import React, {useState, useEffect} from 'react';

// context 객체를 아래의 함수에 넣어준다. (택스트도 상관없지만.. 보통 여러정보니깐 객체형태로..)
// 아래의 형태는 auto completion으로서 다른 컴포넌트에서 해당 함수나 변수를 불러올때 쓰이므로 
// 아래와 같이 더비형태의 함수라도 형태만이라도 적어두는게 좋다.
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

// 아래와 같이 로긴 기능에 관련된 함수와 변수를 공유하기 위한 context 컴포넌트를 만들어보자!
// 아래의 컴포넌트는 App.js 에서 사용하고 App.js 에서 겹치는 부분은 삭제해줘야 한다.
// 아래 컴포넌트의 결합은 index.js 에서 처리해준다.
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
// 기존의 상위 컴포넌트에 wrapping으로  provide 처리를 하고 
// 다른 하위컴포넌트에선 listen 하여 위의 객채를 공유한다