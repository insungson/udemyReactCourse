import React from "react";
//아래의 라이브러리 함수가 portal를 설정하는데 도와준다!
import { createPortal } from "react-dom";

import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";
import App from "../../App";

//portal을 만들곳은 index.html 에서 root id 위에 backdrop-root, overlay-root 를 추가로 만들었다.
// 이를 분리시키기 위해 아래와 같이 2개로 구분하여 컴포넌트화 해준다.

const Backdrop = (props) => {
  return <div className={classes.backdrop} onConfirm={props.onConfirm} />;
};

const Modaloverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

// createPortal() 함수는 App.js의 ReactDOM에서 사용한것과 같다
const ErrorModal = (props) => {
  return (
    <>
      {createPortal(
        <Backdrop onConfirm={props.Confirm} />,
        document.getElementById("backdrop-root")
      )}
      {createPortal(
        <Modaloverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
      {/* <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </Card> */}
    </>
  );
};

export default ErrorModal;
