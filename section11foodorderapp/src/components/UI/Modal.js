import React from "react";
import classes from "./Modal.module.css";

import ReactDom from "react-dom";

//아래의 컴포넌트들은 다른 파일로 관리해도 된다!
// 주의할점은!! BackDrop을 사용할때 onClick을 실행할때마다 창이 닫히게 되기 때문에
// 상황별로 아래의 컴포넌트들을 만들어두는게 좋다. (상황에 따라 세부적으로 정하자!)
// 여기선 모달을 사용함에 있어 재사용이 가능하기 때문에 아래처럼 사용하면 된다!
const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

// 여기서 React protal 에 대해서 알아볼 것이다!!
// 이전에도 한번 해본적이 있다..
// 우선 public/index.html 파일에 가서 다른 <div id="overlays"></div>  를 추가해준다!!
// (원래는 root에서 보여주지만.. react portal을 사용하여 여기서 children 처럼
//  하위컴포넌트를 사용하는것처럼 사용할 것이다.)
const Modal = (props) => {
  return (
    <>
      {/* 아래와 같이 사용한다면 굳이 react portal을 사용할 필요가 없다 */}
      {/* <BackDrop />
    <ModalOverlay>{props.children}</ModalOverlay> */}
      {/* createPortal(어떤컴포넌트를, 어느위치에넣을지!) */}
      {ReactDom.createPortal(
        <BackDrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
