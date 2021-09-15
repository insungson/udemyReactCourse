import { createSlice } from "@reduxjs/toolkit";

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

export const counterAction = counterSlice.actions;

export default counterSlice.reducer;
