import React, { Component, Fragment } from "react";
import Transition from "react-transition-group/Transition";

import "./App.css";
import Modal from "./components/Modal/Modal";
import ModalAd from './components/Modal/ModalAd';
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
        modalIsOpen1: false,
    showBlock1: false,
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
    showModal1 = () => {
    this.setState({ modalIsOpen1: true });
  };

  closeModal1 = () => {
    this.setState({ modalIsOpen1: false });
  };

  //아래의 코드에서 Modal 컴포넌트의 css 효과는 먹지만...
  // 모달을 없애는 Backdrop 컴포넌트는 css 효과가 먹지 않고 바로 모달창이 없어지게 된다..
  // 그래서 다른 라이브러리를 사용해보자
  // https://www.npmjs.com/package/react-transition-group     참조
  // https://reactcommunity.org/react-transition-group/transition    참조
  // Transition 컴포넌트는 아래와 같이 컴포넌트로 감싸고 내부에서 {} 안에서 함수로 처리 하면 된다!
  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button
          className="Button"
          onClick={() =>
            this.setState((prevState) => ({
              showBlock: !prevState.showBlock,
            }))
          }
        >
          Toggle
        </button>
        <br />
        <Transition
          in={this.state.showBlock}
          timeout={1000}
          mountOnEnter //wrapper 로 감싼 태그들이 자식으로 생긴다.
          unmountOnExit //wrapper 로 감싼 자식 태그들이 없어진다.
          //아래의 옵션들은 말 그대로 에니메이션이 발생할때의 시점에 맞춰
          //동작하는 함수이다. (아래는 참조이다.)
          //http://reactcommunity.org/react-transition-group/transition#Transition-prop-onEnter 
          onEnter={() => console.log('onEnter')}
          onEntering={() => console.log('onEntering')}
          onEntered={() => console.log('onEntered')}
          onExit={() => console.log('onExit')}
          onExiting={() => console.log('onExiting')}
          onExited={() => console.log('onExited')}
        >
          {(state) => (
            <Fragment>
              {/* 아래의 state 변화를 살펴보자 */}
              <p>{state}</p>
              <br />
              <div
                style={{
                  backgroundColor: "red",
                  width: 100,
                  height: 100,
                  margin: "auto",
                  transition: "all 0.3s ease-out", // 속성을 서서히 변화시키는 옵션이다.(animating 처리)
                  //  https://www.codingfactory.net/10953   참조
                  opacity: state === "exited" ? 0 : 1,
                }}
              />
            </Fragment>
          )}
        </Transition>
        {/* {this.state.showBlock ? (
          <div
            style={{
              backgroundColor: "red",
              width: 100,
              height: 100,
              margin: "auto",
            }}
          ></div>
        ) : null} */}
        {this.state.modalIsOpen ? (
          <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        ) : null}

        {this.state.modalIsOpen ? (
          <Backdrop show={this.state.modalIsOpen} />
        ) : null}
        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <br />
        {/* 모달창이 사라질때 위의 this.state로 접근한 코드는 그냥 없어지지만
        아래의 ModalAd 는 모달창이 사라질때 에니메이션 효과가 있다 */}
        <ModalAd show={this.state.modalIsOpen1} closed={this.closeModal1} />
        {this.state.modalIsOpen1 ? (
          <Backdrop show={this.state.modalIsOpen1} />
        ) : null}
        <button className="Button" onClick={this.showModal1}>
          Open Modal1
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;


// 아래의 링크는 다른 에니메이션 3rd 라이브러리이다.
//React-Motion   https://www.npmjs.com/package/react-motion
//React-Move     https://www.npmjs.com/package/react-move
//React Router Transition  https://www.npmjs.com/package/react-router-transition