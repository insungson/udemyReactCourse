import { Component, Fragment } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
      errorSituation: null,
    };
  }
  // 아래의 componentDidCatch() 는 wrapper로 감쌀때 자식 클래스 컴포넌트에서
  // 일어난 모든 에러를 잡아준다!!
  // (다만 함수형이 아닌 클래스 컴포넌트에서만 동작을 한다!)
  componentDidCatch(error) {
    //error객체를 통하여 에러객체가 전달된다
    console.log("err", error, typeof error, error.message);
    this.setState({
      hasError: true,
      errorSituation: error,
    });
  }

  //랜더에서 아래와 같이 설정 후 에러잡기를 원하는 컴포넌트를 감싸주면 된다!
  render() {
    if (this.state.hasError) {
      return <p>{this.state.errorSituation.message}</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
