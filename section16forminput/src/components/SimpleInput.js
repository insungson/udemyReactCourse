import { useEffect, useRef, useState } from "react";

import useInput from "../hooks/use-input";

// API 키는 프론트에서 노출시키면 안된다.
//https://academind.com/tutorials/hide-javascript-code/  참조
// 노드는 상관없지만 프론트 코드는 노출될 가능성이 많다.
// 물론 개발자모드와 배포모드는 다르기 때문에 배포모드에선 안보여질것이다.
// API키가 노출되도 상관없을까? => firebase 비번이나 구글클라우드 비번일 경우는 절대 안되지만..
// 만약 누군가 API키로 다른 프로젝트나 본인상품에 사용할때 어떻게 해야하나?
// -> API키는 특정 주소로 설정이 가능하기 때문에 크게 상관은 없다 (내 프로젝트만 동작하도록 주소 설정을 하면 된다)

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // 아래는 input태그에서 바뀔때만 유효성 검사를 확인하기 위한 state로 setState는 submitHandler에서 처리!
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const emailValidationFuc = (value) => {
    const mailformat =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const enteredEmailIsValid = value.match(mailformat) ? true : false;
    return enteredEmailIsValid;
  };

  //이메일 부분을 훅스로 바꿔보자!!
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputIsInvalid,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useInput(emailValidationFuc);

  //위의 state를 아래와 같이 처리를 하고 state를 줄일수도 있다.
  //다른 곳에서 쓰이는 setState 코드도 없어지기 때문에 코드도 줄어들게 된다!
  const enteredNameIsValid = enteredName.trim() !== "";
  console.log("enteredNameIsValid: ", enteredNameIsValid);
  console.log("enteredNameTouched: ", enteredNameTouched);
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  console.log("nameInputIsInvalid: ", nameInputIsInvalid);
  // const mailformat =
  //   /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  // const enteredEmailIsValid = enteredEmail.match(mailformat) ? true : false;
  // console.log("enteredEmail: ", enteredEmail);
  // console.log("enteredEmailIsValid: ", enteredEmailIsValid);
  // console.log("enteredEmailTouched: ", enteredEmailTouched);
  // const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
  // console.log("emailInputIsInvalid: ", emailInputIsInvalid);

  // //form 태그에서는 input 태그들의 유효성검사가 모두 통과해야 유효하다고 할 수 있다.
  // //formIsValid state를 하나 만들어 submit 버튼의 disable을 정하는 기준을 만드는것도 괜찮다!
  // const [formIsValid, setFormIsValid] = useState(false);

  // //useEffect의 dependency를 사용하여 변화하는 state가 있을때 바로 대응하도록 한다.
  // //지금 예시는 enteredNameIsValid 하나만 체크하면 되기 때문에 이것만 dependency에 넣어준다.
  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [enteredNameIsValid]);

  //위의 코드 역시!! useEffect를 제거하는 코드를 사용하여 컴포넌트의
  //재평가사이클(re-evaluation cycle)을 줄이는 코드를 사용하는게 좋다
  // 주석처리 후 useEffect을 없애는 코드를 살펴보자
  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }
  //default 가 false 이기 때문에 else문에서 false로 처리할 필요가 없다.

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    // if (event.target.value.trim() !== "") {
    //   setEnteredNameIsValid(true);
    //   //뒤에 따로 진행시킬 로직이 없기 때문에 굳이 return을 사용할 필요가 없다.
    // }
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
    // if (enteredName.trim() === "") {
    //   setEnteredNameIsValid(false);
    // }
  };

  // const emailInputChangeHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  // };
  // const emailInputBlurHandler = (event) => {
  //   setEnteredEmailTouched(true);
  // };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    //위의 작업을 안해주면 브라우저의 기능으로 자동으로 서버로 HTTP 요청이 된다.
    //자바스크립트와 HTML 파일로 만들어진 static 서버이기 때문에 이렇게 막아줘야 한다.

    setEnteredNameTouched(true);
    // setEnteredEmailTouched(true);

    // //아래는 validate 관련 state를 일반 변수로 처리하면서 없어진 로직이다.
    // if (enteredName.trim() === "") {
    //   setEnteredNameIsValid(false);
    //   return;
    //   //빈 리턴을 처리하여 if문 밖의 로직을 실행시키는것을 막는다.
    // }
    // setEnteredNameIsValid(true);
    // //위의 코드는 아래와 같이 처리할 수 있다,.
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    //아래와 같이 state로 접근이 가능하고
    console.log(enteredName);
    // console.log(enteredEmail);
    //아래처럼 ref로도 가능하다 (1회성일때는 이렇게 사용하는게 낫다.)
    const enteredValue = nameInputRef.current.value;
    console.log("enteredValue: ", enteredValue);
    //하지만.. 초기화 작업을 해주는 상황이라면 setState로 처리해줘야 한다.

    // nameInputRef.current.value = '';  => 좋은 방법이 아니다 DOM을 직접적으로 건들면 안된다.
    setEnteredName("");
    setEnteredNameTouched(false); // 터치도 초기화 시켜서 바로 안뜨게 만들어야 한다!
    // setEnteredEmail("");
    // setEnteredEmailTouched(false);
    emailReset();
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          value={enteredName}
          onBlur={nameInputBlurHandler} //input의 focus가 없어질때만 적용
          onChange={nameInputChangeHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">Your Email</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onBlur={emailInputBlurHandler} //input의 focus가 없어질때만 적용
          onChange={emailInputChangeHandler}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Wrong Email format.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
