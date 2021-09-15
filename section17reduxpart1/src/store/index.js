import { createStore } from "redux";
//리덕스 툴킷을 사용해보자!
//https://redux-toolkit.js.org/introduction/getting-started
//configureStore 는 createStore와 같은것으로 여러 리듀서를 merge(병합)처리해준다
import { createReducer, createSlice, configureStore } from "@reduxjs/toolkit";
//createReducer 를 사용해도 되지만 createSlice 가 더욱 파워풀 하다!
//createSlice는 state를 slice 하여 다른 모듈별로 구분하여 state를 설정하는것이다.
//EX) 인증 slice의 state와 counter slice의 state 를 나눠서 만들 수 있다.
//(나눠서 다른파일로 구분하여 설정하고 그게 유지되도록 만든다.)

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter", // name 속성은 넣어줘야 한다.
  initialState: initialCounterState, // 관련 state를 널어줘야한다
  reducers: {
    //기존의 reducer 처럼 if나 switch 문을 사용할 필요가 없다!
    increment(state) {
      //리듀서에서는 새로운 객체를 리턴하여 불변성을 유지했지만..
      //redux toolkit 에서는 아래와 같이 기존 객체의 속성에 추가를 해도
      //redux toolkit 내부적으로 불변성을 유지하기 때문에 아래와 같은 코드를 써도 된다!!
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increse(state, action) {
      //만약 action을 통해 다른 값을 넘겨준다면 두번째 파라미터로 action을 넘겨받을 수 있다.
      //그리고 기존의 리듀서와는 달리 redux-toolkit은 값을 받는 속성 이름이 payload로 고정이 되어있다.
      //그래서 아래와 같이 바꿔줘야 한다.
      // 아래는 리덕스툴킷 내부에서 처리하는 형식이다. 타입은 알아서 유니크값으로 값은 디폴트로 payload로 정해진다.
      //{type: SOME_UNIQUE_IDENTIFIER, payload: 5}
      // state.counter = state.counter + action.amount;
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

//인증관련 리듀서툴킷설정
const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

// counterSlice.actions.increment
//이렇게 액션함수로 접근이 가능하기 때문에 굳이 조건문으로 나누고,
//문자를 변수로 설정하여 dispatch를 사용할 필요가 없다

export const counterAction = counterSlice.actions;
export const authAction = authSlice.actions;

//기존의 방법처럼 store로 다른 컴포넌트에서 사용하기 위해 아래와 같이 처리해준다
// const store = createStore(counterSlice.reducer);
//위와같이 해도 되지만.. 여러개의 리듀서를 처리하기 위해선 아래와 같이 해주자
const store = configureStore({
  reducer: {
    //이렇게 리듀서를 객체로 만들어서 키값을 원하는 이름으로 만들어서 다른 컴포넌트에서 사용할 수 있다!
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;

// //기존의 redux 는 주석처리하자
// export const INCREMENT = 'INCREMENT';
// export const DECREMENT = 'DECREMENT';
// export const INCREASEAMOUNT = 'INCREASEAMOUNT';
// export const TOGGLE = 'toggle';

// //리듀서의 리턴은 기존의 값들을 병합하는게 아니라 overwrite 처리를 하는것이다.
// //그래서 현재값들을 복사를 해야한다!!
// const counterReducer = (state = initialState, action) => {
//   if (action.type === INCREMENT) {
//     //절대 아래와 같이 기존의 state객체에 값을 바꾸고 이 객체를 리턴하면 안된다!!!
//     //객체값은 참조형이기 때문에 직접 바꿔서 바뀐값을 리턴해줘야 하기 때문이다!!
//     // state.counter++;  //이렇게 객체를 직접 바꿔서
//     // return state;  //이렇게 이 객체를 보내면 참조형이기 때문에 문제가 발생할 수 있다!
//     // https://academind.com/tutorials/reference-vs-primitive-values 참조
//     // https://redux.js.org/usage/structuring-reducers/immutable-update-patterns#immutable-update-patterns 참조
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter,
//     };
//   }
//   if (action.type === DECREMENT) {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter,
//     };
//   }
//   if (action.type === INCREASEAMOUNT) {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter,
//     };
//   }
//   if (action.type === TOGGLE) {
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter,
//     };
//   }
//   return state;
// };

// const store = createStore(counterReducer);

// export default store;
// //provider로 감싸는건 감싸고 싶은 컴포넌트에서
// //import {Provider} from 'react-redux';
// //를 사용해서 wrapper로 감싸면된다.
