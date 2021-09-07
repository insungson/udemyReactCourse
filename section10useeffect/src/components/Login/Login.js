import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

//useReducer의 reducerFn 은 해당 컴포넌트 밖에서 만들어야 한다!(해당 컴포넌트와 겹치면 안되기 때문이다)
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    //아래처럼 처리하면 넘겨주는 변수에서 바로 isValid 체크가 가능해진다.
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    //아래처럼 state로 접근하면 최근의 state 값을 가져올 수 있다.
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

//위와 같이 password도 같은걸 적용시켜보자
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // useReducer로 바꾸기 때문에 아래의 2개는 필요가 없어진다.
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        // enteredEmail.includes('@') && enteredPassword.trim().length > 6
        //dependcy를 바꿨으므로 아래도 바꿔준다.
        // emailState.isValid && passwordState.isValid
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
    //아래와 같이 dependency를 잡으면 유효성 검사가 끝나더라도 계속 useEffect가 돌아간다.
    // 콘솔이 계속 찍힘..
    // }, [emailState, passwordState]);
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // 아래의 setState 부분은 useReducer의 dispatchFn으로 바꿔준다.
    // setEnteredEmail(event.target.value);
    // type을 정하고 payload로 넘길 변수를 넣으면 된다.
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // // form에 대한 유효성 검사는 한곳에서 하는게 더 낫기 때문에 위의 useEffect 을 사용할것이다.
    // setFormIsValid(
    //   // event.target.value.includes('@') && enteredPassword.trim().length > 6
    //   event.target.value.includes('@') && passwordState.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // // form에 대한 유효성 검사는 한곳에서 하는게 더 낫기 때문에 위의 useEffect 을 사용할것이다.
    // setFormIsValid(
    //   // 기존의 state를 useReducer의 state로 바꿔준다 enteredEmail => emailState.isValid
    //   // enteredEmail.includes('@') && event.target.value.trim().length > 6
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // 기존엔 input 태그내의 valid 가 맞지 않을때 버튼이 disable이 되지 않고 valid 가 맞지 않는
    // 태그에 focus 기능이 들어가게 바꿔보자
    if (formIsValid) {
      // props.onLogin(enteredEmail, enteredPassword);
      authCtx.onLogin(emailState.value, passwordState.value);
    }
     else if (!emailIsValid) {
      //이멜 input 에 대한 focus 처리를 하기 전에 해당 input 컴포넌트에서 useRef 처리를 해줘야 한다.
      //하위컴포넌트인 input 컴포넌트에서 React.forwardRef()처리를 해주고, 
      // useImperativeHandle() 함수내부의 속성값을(여기선 focus) 불러온다.
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ''
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        <Input
          ref={emailInputRef}
          id="email"
          type="email"
          label="E-Mail"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        {/* <div
          className={`${classes.control} ${
            // passwordIsValid === false ? classes.invalid : ''
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // value={enteredPassword}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <Input
          ref={passwordInputRef}
          id="password"
          type="password"
          label="Password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button 
            type="submit" 
            className={classes.btn} 
            // disabled={!formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
