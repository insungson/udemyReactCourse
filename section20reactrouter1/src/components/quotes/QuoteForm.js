import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  //form이 active 상태인지 구별을 위한 focus state
  const [isEntering, setIsEntering] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  //아래는 form 에서 내용을 적고 submit을 하기전 페이징을 바꿀때 기존의 내용이 날라가기 때문에
  //Prompt 컴포넌트(react-router-dom)을 사용하여 form의 focus가 될때는 경고창을 띄워주는
  //로직을 만들기 위한 작업을 할것이다.
  const formFocusedHandler = () => {
    console.log("Focus!!");
    //focus 상태일땐 true로 설정하자
    setIsEntering(true);
  };

  //버튼 클릭시 form active 를 false로 바꾸기 위하 아래의 함수를 버튼에 넣어주자
  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  //form이 active 상태일때를 구분하기 위해 onFocus 속성을 넣어주자!
  return (
    <Fragment>
      <Prompt
        when={isEntering} //focus state가 true 일때 message 경고창 띄움!
        message={(location) => {
          console.log("location: ", location);
          // 콘솔로 찍으면 아래와 같이 현재 페이징 정보가 나온다.
          // {pathname: '/quotes', search: '', hash: '', state: null, key: 'nl4acc'}
          return "Are you really trying to leave this page? this text will be lost";
        }}
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={finishEnteringHandler}>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
