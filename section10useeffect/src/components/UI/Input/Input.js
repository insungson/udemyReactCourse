import React, {useRef, useEffect, useImperativeHandle} from "react";
import classes from "./Input.module.css";

//부모컴포넌트에서 자식 컴포넌트로 ref를 넘겨줄때 아래와 같이 React.forwardRef() 함수를 사용한다.
// 첫번째 인자는 props,  두번째 인자는 ref 이다!!
const Input = React.forwardRef((props, ref) => {
  //input 태그에 ref 를 추가해주고 아래의 useRef() 변수를 넣어준다
  const inputRef = useRef();

  // //한번 랜더링 시키고 한번더 동작하는 useEffect를 이용하여 focus 처리를 해준다
  // // 처름 한번 랜더링 되고 useEffect은 랜더링 후 동작한다!
  // useEffect(() => {
  //   inputRef.current.focus(); 
  //   //focus 는 input 태그의 DOM 객체에 있는 함수이다.(자바스크립트 빌트인 함수)
  // }, []);

  const activate = () => {
    inputRef.current.focus();
  };
  
  // 상위 컴포넌트의 ref를 하위 컴포넌트의 ref로 연결시켜주는 hooks 함수이다.
  // 첫번째 인자는 React.forwardRef의 두번째 인자인 ref이고
  // 두번째 인자는 () => {} 함수인데.. {속성: 값}객체를 리턴해주고 
  //  속성은 부모컴포넌트에서의 사용할 변수이고(ex-속성명을 a라고 할때 부모컴포넌트에선 inputRef.current.a )처럼 접근한다., 
  //  값은 여기서 사용할 함수 or 변수명이다.
  useImperativeHandle(ref, () => {
    return {
      focus: activate, //굳이 focus가 아닌 다른걸 써도 된다. (a 로 바꾸면 부모에서도 a로 접근해야한다!)
    };
  })

  return (
    <div
      className={`${classes.control} ${
        // emailIsValid === false ? classes.invalid : ''
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        // value={enteredEmail}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
