import { useState, Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

class Users extends Component {
  //클래스의 state는 아래처럼 생성자에서 처리해준다!
  constructor() {
    super();
    //hoos는 useState(어떤형태든 가능!)이지만.. useState를 여러개 만들어서 따로관리해준다!
    //class 는 this의(Component 클래스의 상속) state 속성으로 접근하여 {} 객체형태 내부에서
    //그룹으로 만들어서 세부적인 state의 형태를 정해야한다!
    this.state = {
      showUsers: true,
      showManagers: ["num1", "num2"], //이런식으로 추가해줄 수 있다!
    };
  }

  componentDidMount() {
    //보톨 자바스크립트에선 try catch 문으로 에러를 해결한다
    //그렇다고 랜더링 하는 함수에서 아래의 try catch 문을 사용할 수는 없다.
    // try {
    //   //someCatcherrorLogic Func
    // } catch (error) {
    //   // handle error
    // }
    if (this.props.users.length === 0) {
      throw new Error("No users Provided!");
    }
  }

  //클래스는 이렇게 바꿔준다
  toggleUsersHandler() {
    //이벤트 함수에서 state를 바꿀땐 절대 아래처럼 직관적으로 접근하여 바꾸면 안된다!
    //this.state.showUsers = false; // 절대 하면 안됨!! 아래와 같이 바꿔야 한다!
    //다행인건... class 의 setState에서도 최신값을 가져와서 업데이트를 할 수 있단 점이다!
    //다만 리턴은 객체형태로 해줘야 한다!!
    this.setState((curState) => {
      return {
        // ...curState, 이렇게 복사처리를 안해도 showManagers 의 데이터는 그냥 자동으로 merge가 된다!!!
        showUsers: !curState.showUsers,
      };
    });
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    //toggleUsersHandler 함수에 this를 사용하는 이유는!!
    // User 클래스의 함수를 쓰기 위함이고,  bind()는 함수나 메서드를 호출할때 사용하는 함수로
    // 여기선 User클래스 내부의 usersList 자료를 가져오는 것이므로(클릭이벤트를 통해)
    // bind로 this를 받아야 한다!!!
    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
