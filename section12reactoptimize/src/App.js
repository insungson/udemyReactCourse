import React, { useState, useCallback, useMemo } from "react";
import Button from "./components/UI/Button/Button";

import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";
import DemoList from "./components/Demo/DemoList";

//총정리 : react 컴포넌트는 기본적으로 JSX 코드를 리턴해주는 역할을 한다!(눈에 보이는 output!)
// 컴포넌트는 state, props, context 의 변화에 의해 동작한다!!
// 만약 state가 변화한다면 컴포넌트는 재평가를 하고 컴포넌트 함수는 재실행을 하게 된다!
// 리엑트는 현재와 이전의 평가로 비교하여 컴포넌트 함수를 재실행할지 말지를 결정한다! (재실행된다면 하위컴포넌트도 전부 재실행? 된다)
// 그리고 ReactDOM은 변화를 우리가 볼수 있게 웹으로 만들어준다!
// ? 를 표시한 이유는! 하위컴포넌트에서 React.memo()를 사용할때 props 가 변화하지 않는다면 재실행하지 않도록 막는 기능이 있기 떄문이다!
// 주의할점은!! React.memo()를 사용하여 props를 넘겨 재실행을 막아줄때 props 는 원시형 데이터(number, string, boolean 같은..)가 아닌
// 객체형, 배열형으로 보내준다면 === 비교가 되지 않기 때문에 재실행되게 된다!!!

//궁금증!!!
//컴포넌트 함수가 재실행된다면 왜!! 함수가 재실행될때마다 useState에서 설정한 초기값으로 안돌아가고 이전값이 이어지는가??
// -> 현재 보이는 DOM 상에서 사용중인 컴포넌트라면 재실행되어도 기존의 useState를 사용하여 초기화가 아닌 업데이트작업을 해주기 때문이다!
//    만약 다른 DOM의 컴포넌트에 접근 후 전 상황의 컴포넌트로 돌아온다면 useStete는 초기화가 될 것이다!!
function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);
  const [titleList, setTitleList] = useState("");

  console.log("App Running");

  //useCallback은 함수를 저장하고, 그 함수의 좌표? 를 비교하는 처리를 해준다.
  //예를 들면 let obj1 = {}, let obj2 = {} 처럼 빈 객체가 있을때
  //obj1 === obj2 는 false 이다... 하지만 obj1 = obj2 로 같은 객체를 가르키고 비교를 하면 true이다!
  //useCallback은 이런 식으로 값(여기선 함수)을 저장한다!(리엑트 내부 어딘가(메모리) 저장처리를 한다)
  //맨뒤의 []에 관련 값이 없을때 closure 때문에 allowToggle의 초기값인 false로 인식이되어 함수가 재실행(recreate)되지만..
  //[]에 값을 넣어줄땐 allowToggle의 최신값(바뀐값) 인식이 되어 함수를 재실행(recreate)하기 때문에 콘솔에 찍히는것이다!!
  //(아래처럼 allowToggle를 넣을땐 allowToggle값이 변할땐(최신값 기준으로) 해당 함수를 재실행한다(recreate))
  //그래서!!! 함수를 props로 넘길때!! 무조건 !! useCallback을 사용하여 dependency([]) 에서 변화하는 걸 정하고
  // useCallback을 사용한 함수를 넘겨야 재실행을 막아줄 수 있다!!
  // const allowToggleHandler = useCallback(() => {
  //   setAllowToggle(true);
  // }, []);
  // const toggleParagraphHandler = useCallback(() => {
  //   if (allowToggle) {
  //     setShowParagraph((prevShowParagragh) => !prevShowParagragh);
  //   }
  // }, [allowToggle]);

  const toggleParagraphHandler = () => {
    setShowParagraph((prevShowParagragh) => !prevShowParagragh);
  };

  const changeTitleHandler = useCallback(() => {
    setTitleList("New Title");
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      {/* <DemoOutput show={showParagraph} /> */}
      {/* 아래를 false로 바꾼다면 화면상 변화는 없다. 하지만 DemoOutput 컴포넌트의 콘솔은 동작한다!
      이유는 상위 컴포넌트가 변화한다면 하위컴포넌트도 같이 동작하기 때문에 어떤 props가 들어가든 상관없다! 
      3번사진 참조!!  */}
      {/* <DemoOutput show={allowToggle} /> */}
      {/* {showParagraph && <p>This is new!</p>} */}
      {/* <DemoOutput show={false} /> */}
      {/* 아래의 Button 컴포넌트에서도 React.memo()로 감싸는데 여긴 왜?? 콘솔에 찍힐까?
      이유는!! 위의 DemoOutput 컴포넌트의 show 는 원시형 데이터인 boolean이 들어가서 false === false 처럼
      단순 비교가 되지만.. 아래의 컴포넌트는 toggleParagraphHandler 함수이기 때문에 객체 === 객체는
      (굳이 따지자면 여기선 함수를 새로 만들기 때문에 생기는 현상이다.)
      비교가 안되기 때문에 아래의 Button 컴포넌트가 재실행 되는 것이고 콘솔에 찍히는 것이다. */}
      {/* <Button onClick={allowToggleHandler}>AllowToggle Paragragh!</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragragh!</Button> */}

      {/* 아이템 배열을 1회로 줄이기 위해 아래와 같이 useMemo가 들어간 변수를 props로 넘겨주자 */}
      <DemoList title={titleList} items={listItems} />
      {/* 아래처럼 배열을 직접 넣으면 새배열을 넣는것과 마찬가지이기 때문에 useMemo로 처리하여 넘겨야 재실행이 안된다! */}
      {/* <DemoList title={titleList} items={[5, 3, 1, 10, 9]} /> */}

      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;
