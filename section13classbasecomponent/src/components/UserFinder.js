import { Fragment, useState, useEffect, Component } from "react";
import UsersContext from "../store/users-context";
import Users from "./Users";
import ErrorBoundary from "./ErrorBoundary";

import classes from "./UserFinder.module.css";

// const DUMMY_USERS = [
//   { id: "u1", name: "Max" },
//   { id: "u2", name: "Manuel" },
//   { id: "u3", name: "Julie" },
// ];

//클래스 기반 컴포넌트에서 한 컴포넌트에서 여러개의 context 는 사용할 수 없다!
//(굳이 여러context 를 사용해야 한다면 wrapper로 감싸서 하나처럼 만들어서 사용해야 한다!)
//hook 에서는 useContext() 를 사용하여 한 컴포넌트에서 여러개의 context 사용이 가능했다..
class UserFinder extends Component {
  //아래와 같이 static contextType 으로 선언후 아래서 this.context.컨택스트속성  으로 사용하면 된다.
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    // send http request 보통 여기서 처음 컴포넌트가 랜더링될때
    //이런 데이터들을 받아서 해당 state에 넣어준다
    this.setState({
      filteredUsers: this.context.users,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    //아래의 조건문을 사용하지 않는다면 무한루프가 발생된다
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        {/* <UsersContext.Consumer></UsersContext.Consumer> 여기서 이렇게 사용하는 방법이 있고... */}
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
