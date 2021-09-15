import React, { Component } from "react";
import { useSelector, useStore, connect, useDispatch } from "react-redux";
//useStore도 직접적으로 store 데이터에 접근할 수 있지만.. useSelector가 state를 관리하는데 더 유용하다!
// class 컴포넌트를 사용한다면 connect 를 사용해야 한다!
import classes from "./Counter.module.css";
import {
  INCREASEAMOUNT,
  DECREMENT,
  TOGGLE,
  INCREMENT,
  counterAction,
} from "../store/index";

const Counter = () => {
  // //아래처럼 store state에 접근하면 된다!! (subscribe) 리듀서만 사용할 경우!
  // const counter = useSelector((state) => state.counter);
  // const show = useSelector((state) => state.showCounter);
  const dispatch = useDispatch();

  // const store = configureStore({
  //   reducer: {
  //     //이렇게 리듀서를 객체로 만들어서 키값을 원하는 이름으로 만들어서 다른 컴포넌트에서 사용할 수 있다!
  //     counter: counterSlice.reducer,
  //   },
  // });
  //리덕스툴킷은 위와같이 설정했으므로 아래와 같이 counter객체를 한번 거쳐서 접근해야한다
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    // dispatch({ type: INCREMENT });
    //위는 기존의 리덕스 방식
    dispatch(counterAction.increment());
  };

  const decrementHandler = () => {
    // dispatch({ type: DECREMENT });
    dispatch(counterAction.decrement());
  };

  const increaseAmount = (value) => {
    // dispatch({ type: increaseAmount, amount: value });
    // 아래는 리덕스툴킷 내부에서 처리하는 형식이다. 타입은 알아서 유니크값으로 값은 디폴트로 payload로 정해진다.
    //{type: SOME_UNIQUE_IDENTIFIER, payload: 5}
    dispatch(counterAction.increse(value));
  };

  const toggleCounterHandler = () => {
    // dispatch({ type: TOGGLE });
    dispatch(counterAction.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={() => increaseAmount(5)}>Increse by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// //아래는 클래스 컴포넌트 방식이다.
// class Counter extends Component {
//   incrementHandler() {
//     //아래에서 mapping을 했기 때문에 여기서 props 로 접근이 가능하다!
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// // 클래스 컴포넌트로 redux의 store에 접근하려면 아래와 같이 connect() 함수를 사용해야 한다!
// // 그리고 connect 를 사용하기 전에 아래와 같이 사전작업을 해서 store의 state, dispatch를 사용할 수 있다.
// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: "INCREMENT" }),
//     decrement: () => dispatch({ type: "DECREMENT" }),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
