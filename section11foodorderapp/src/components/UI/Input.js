import React from "react";
import classes from "./Input.module.css";

//아래의 <input {...props.input} /> 처럼 props.input 객체에 input 태그에 관련된
//속성들이 들어있다면 굳이 다 적을 필요 없이 아래와 같이 처리해 주면 된다!
const Input = React.forwardRef((props, ref) => {
  //위와 같이 useRef를 상위 컴포넌트에서 받아서 처리해준다!
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
