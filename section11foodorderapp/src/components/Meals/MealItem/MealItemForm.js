import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

//Input 커스텀 컴포넌트 처럼 사용하려면 input 속성에  아래와 같이 객체형태로 넣어주면 된다!
//(다른 컴포넌트에서 사용할때도 아래의 형식으로 사용하면 된다!)
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(false);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    //브라우저의 리로딩 페이징을 막기 위한 코드
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount; // string => number 로 변환

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      //위의 조건에 맞지 않으면 유효성은 false로
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };
  //useRef를 넘겨주고 넘겨받는 하위컴포넌트에서 React.forwardRef()로 wrapper 처리해준다!
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        lable="Amout"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
