import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const API_KEY = "AIzaSyBwuX3ywjJQxmnljVptj8b8ERxX7SlKLAk";

const firebaseAuthURL = (isLogin) => {
  return isLogin
    ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}` //로긴 요청
    : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`; //회원가입 요청
};

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // 로긴폼작성후 보낼 핸들러처리
  // firebase의 메서드를 사용하여 이멜/비번으로 로긴 인증을 할 것이 때문에 아래의 링크를 참조하자
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: add Validation!!
    setIsLoading(true);
    //위의 링크에서 확인하길.. 이멜/비번의 인증은 POST 방식을 사용하고 이멜,비번은 JSON 방식으로 넘겨줘야한다.
    fetch(firebaseAuthURL(isLogin), {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // show an error modal
            let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("data: ", data); //여긴 제대로된 정보가 온다.
        //토큰 기한 + 현재 시간   으로 시간을 계산후 login 함수에 인자로 넣는다.
        //expiresIn 는 string 이기 때문에 앞에 +를 붙여 정수로 바꾸고 ms 이기 때문에 1000을 곱해준다!
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        //시간이 아닌 string으로 변환해서 보내준다.
        authCtx.login(data.idToken, expirationTime.toISOString());
        //로그인 성공시 메인페이지로 리다이렉트 처리!
        history.replace("/");
      })
      .catch((error) => {
        console.log("error: ", error);
        alert(error.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
