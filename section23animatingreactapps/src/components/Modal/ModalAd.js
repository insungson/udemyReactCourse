import React from 'react';
import Transition from "react-transition-group/Transition";
import CSSTransition from 'react-transition-group/CSSTransition';

import './Modal.css';

//Transition 의 timeout 옵션으로 appear, enter, exit 가 있다. (아래는참조!)
// http://reactcommunity.org/react-transition-group/transition#Transition-prop-timeout  
// 참고로 css 해당 class의 시간도 위의 시간 옵션처럼 바꿔줘야 한다. 
// (ex ModalClosed, ModalOpen 도 위의 옵션시간에 맞춰서 바꿔주기)
const animationTiming = {
  enter: 400,
  exit: 1000 
};

const ModalAd = (props) => {


//Transition 컴포넌트 : state를 통해 함수형으로 리턴해주고 상황별로 대처가능!
//CSSTransition 컴포넌트 : 자동으로 상황별 class 이름을 만들어준다. 
//다만 상황별로 만들어지는 CSS클래스에 따른 CSS 수정을 해줘야 한다.(여기선 Modal.css 에서 처리했다.)
// http://reactcommunity.org/react-transition-group/css-transition  (CSSTransition 참조)
  return (
    // <Transition
    //   mountOnEnter
    //   unmountOnExit
    //   in={props.show}
    //   timeout={animationTiming}
    // >
    // {state => {
    //   const cssClass = [
    //     'Modal', 
    //     state === 'entering' 
    //     ? 'ModalOpen' 
    //     : state === 'exiting' ? 'ModalClosed' : null
    //   ];
    //   return (
    //     <div className={cssClass.join(' ')}>
    //       <h1>A ModalAD!</h1>
    //       <button className={'Button'} onClick={props.closed}>
    //         Dismiss
    //       </button>
    //     </div>
    //   );
    // }}
    // </Transition>
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      // //예를 들어 아래와 같이 'fade-slide' 라는 클래스이름을 넣어줄때 상황별로 자동으로 클래스를 바꿔준다.
      // //enter 시(시작시) 'fade-slide-enter' 라는 클래스가 만들어지고
      // //enter가 동작했을때(entered 상황) 'fade-slide-enter-activa' 라는 클래스가 만들어진다.
      // //exit 시(시작시) 'fade-slide-exit' 라는 클래스가 만들어지고,
      // //exit가 동작했을때(exited) 'fade-slide-exited' 
      // classNames='fade-slide'
      // 위와 같이 클래스명을 문자열로 고정시켜 정해줄 수도 있지만.. 아래처럼 
      // 상황별 클래스명을 정해줄 수도 있다.
      //http://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-classNames
      classNames={{
        enter: '',
        enterActive: 'ModalOpen',
        exit: '',
        exitActive: 'ModalClosed',
      }}
    >
      <div className='Modal'>
        <h1>A ModalAD!</h1>
        <button className={'Button'} onClick={props.closed}>
          Dismiss
        </button>
      </div>
    </CSSTransition>
  );
};

export default ModalAd;