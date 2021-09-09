import { useState, useReducer } from "react";

//사실 이 프로젝트에선 useReducer가 필요한건 아지만.. 연습을 위해 사용해봦
const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  //previousStateSnapshot!, 뭔갈바꿀 action
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched }; //이전 isTouched 유지
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }

  return initialInputState;
};

const useInput = (validateValue) => {
  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // const valueIsValid = validateValue(enteredValue);
  // const hasError = !valueIsValid && isTouched;

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispatch({
      type: "INPUT",
      value: event.target.value,
    });
  };

  const inputBlurHandler = (event) => {
    // setIsTouched(true);
    dispatch({
      type: "BLUR",
    });
  };

  const reset = () => {
    // setEnteredValue("");
    // setIsTouched(false);
    dispatch({ type: "RESET" });
  };

  return {
    // value: enteredValue,
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
