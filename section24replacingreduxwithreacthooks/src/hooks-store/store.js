import { useState, useEffect } from "react";

//아래의 변수들을 글로벌로 잡아서 밑에서 export 시키는 변수에 적용시킨다.
let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  //dispatch 함수를 사용하여 state를 바꿀때만 동작하도록 flag 설정!
  //useEffect 에서는 동작하지 않게 if 문으로 처리하였다.
  //(이렇게 처리하지 않으면... productItem 컴포넌트에서 리스트중 하나만 클릭해도 전체가 랜더링 된다..)
  // 컴포넌트 최적화!처리
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  //아래의 useEffect 는 1회 실행되며... listener 를 통해 setState를 마운트하고,
  //return 함수를 통해 unMount 시 listener 에서 setState를 제거한다.
  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
    //setState는 함수이므로 dependency에 넣어도 괜찮다.
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userAction, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userAction };
};
