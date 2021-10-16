import React, { useRef, useContext } from "react";
import { TodosContext } from "../store/todos-context";

import classes from "./NewTodo.module.css";

// // 아래는 props 를 통해 받은 state를 해당 컴포넌트에서 처리해 준것이다
// const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
//   // () =>  가 타입스크립트에서 함수 타입을 정의해준다 여기선 리턴을 해주지 않으므로 void 로 처리해 주면 된다
//   // 참고로 input parameter의 이름은 내맘대로 정할 수 있다
//   const todoTextInputRef = useRef<HTMLInputElement>(null);
//   //아래의 태그에서 사용하려면 useRef의 타입도 지정해줘야 하고, defaultValue 도 정해줘야 한다(null 넣음)
//   // input 태그는 아래의 링크 설명처럼 HTMLInputElement 인터페이스에 기반한다
//   // https://developer.mozilla.org/ko/docs/Web/HTML/Element/Input#%EC%86%8D%EC%84%B1

//   const submitHandler = (event: React.FormEvent) => {
//     //폼 테그에 들어가는 이벤트이므로 input parameter 의 타입은 React.FormEvent 로 처리해준다!!
//     //예를 들어 버튼태그의 클릭이벤트라면 React.ClickEvent 로 정의해 줘야 한다.
//     event.preventDefault(); //위에서 event 의 타입을 정의해줬기 때문에 event.을 하면 preventDefault 가 자동으로 뜬다

//     const enteredText = todoTextInputRef.current!.value;
//     //보통 자동으로 todoTextInputRef.current?.value;   이렇게 뜨는데..
//     // 값이 확정적이 아니라 null 일 가능성도 있기 때문에 이렇게 넣어주는거고,
//     // 여기선 확정적으로 value 가 들어가기 때문에 위와 같이 !. 으로 처리해준다

//     if (enteredText.trim().length === 0) {
//       // throw an error
//       return;
//     }

//     props.onAddTodo(enteredText);
//     todoTextInputRef.current!.value = "";
//   };

//   return (
//     <form onSubmit={submitHandler} className={classes.form}>
//       <label htmlFor="text">Todo text</label>
//       <input type="text" id="text" ref={todoTextInputRef} />
//       <button>Add Todo</button>
//     </form>
//   );
// };

//아래는 contextAPI 를 통해 처리한 컴포넌트이다
const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  const todoTextInputRef = useRef<HTMLInputElement>(null);
  //위의 HTMLInputElement 가 사용가능한 이유가 ts.config.json 에서
  //compilerOptions 내부의 lib 속성(라이브러리모음)에 dom 라이브러리가 있기 때문에 인식이 되는것이다
  //만약 ts.config.json 에서 위의 dom 을 삭제한다면 아래의
  // const enteredText = todoTextInputRef.current!.value; 코드 중 value 에서 에러표시가 뜰것이다
  //dom 을 연결시키는 라이브러리가 없기 때문이다

  const submutHandler = (event: React.FormEvent) => {
    //ts.config.json 에서 strict: true,  로 할 경우 위의 event: React.FormEvent   를 처리해 줘야 하지만
    // strict: false,     로 할 경우  그냥 event   만 넣어도 에러가 발생하지 않는다

    //ts.config.json  의 옵션을 더 자세히 알아보기 위해서 아래의 링크를 참조하면 된다
    // https://typescript-kr.github.io/pages/tsconfig.json.html    왼쪽 메뉴에서 밑으로 다른 파트를 클릭하면 더 잘 나와있다
    // https://www.typescriptlang.org/docs/handbook/tsconfig-json.html    노드 버전에 따른 추천 세팅도 있다
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      // throw an error
      return;
    }

    todosCtx.addTodo(enteredText);
    todoTextInputRef.current!.value = "";
  };

  return (
    <form onSubmit={submutHandler} className={classes.form}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
