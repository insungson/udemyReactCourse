import { Component } from "react";
import classes from "./User.module.css";

//컴포넌트 클래스에서 상속을 받아야 한다!
class User extends Component {
  // 생성자는 초기화 작업을 해준다 (아래의 에러가 뜨기에 일단 주석처리!)
  // Must call super constructor in derived class before accessing 'this' or returning from derived constructor
  // constructor() {}

  componentWillUnmount() {
    console.log("User Component is Done!");
  }

  //어떤 JSX 코드를 랜더해줄지 정해준다.
  render() {
    //클래스는 props를 this로 접근해야한다!
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
