import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

import classes from "./ProfileForm.module.css";

//https://firebase.google.com/docs/reference/rest/auth#section-change-password
//비번 바꾸는 API

const API_KEY = "AIzaSyBwuX3ywjJQxmnljVptj8b8ERxX7SlKLAk";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    //add validation

    fetch(
      //아래의 returnSecureToken을 false로 할 경우.. 기존의 토큰값을 유지해아하는데..
      //아래의 url 끝에 ?token=값 처럼 쿼리스트링을 사용해서 넣어도 된다.
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false, //다시 id와 새로운 token 을 reponse로 받을건지에 대한 boolean값
        }),
        headers: {
          "Content-Type": "application/json",
          //토큰을 헤더에 넣는 Bearer Authentication 방법도 있다.
          //Bearer Authentication란?
          //-> API에 접속하기 위해서는 access token을 API 서버에 제출해서 인증을 해야 합니다.
          //이 때 사용하는 인증 방법이 Bearer Authentication 입니다
          // 사용법:
          //예를들어 api 서버가 server.example.com이고, 접근해야 하는 path가 resource이고,
          //access token이 mF_9.B5f-4.1JqM라면 아래와 같이 헤더 값을 만들어서 전송하면 됩니다.
          //GET /resource HTTP/1.1 Host: server.example.com Authorization: Bearer mF_9.B5f-4.1JqM

          //즉! 여기선 아래처럼 보내면 된다!
          Authorization: `Bearer ${authCtx.token}`,
        },
      }
    )
      .then((res) => {
        // asuumption: Always succeeds!
        //성공시 redirect 작업!
        history.replace("/");
      })
      .catch();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        {/* 아래와 같이 minLength 로 들어갈 최소갯수를 넣어주면 이부분은 유효성검사를 할필요가 없다 */}
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
