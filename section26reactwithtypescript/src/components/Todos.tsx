import React, { useContext } from "react";
import Todo from "../models/todo";
import TodoItem from "./TodoItem ";
import classes from "./Todos.module.css";
import { TodosContext } from "../store/todos-context";

// // 아래는 props 로 넘겨받아 처리한 컴포넌트 코드이다
// const Todos: React.FC<{
//   items: Todo[];
//   onRemoveTodo: (id: string) => void;
// }> = (props) => {
//   //items?: string[]을 할 경우 items: string[] | undefined 와 같은 의미이다.

//   //Todo 를 클래스로 빼서 따로 정의를 하면 위와 같이 props.items 의 타입 정의에 사용할 수 있다.
//   //data 의 모델에 대한 모음은 models 폴더에 모아두자!

//   // React.FC 는 react의 함수형 컴포넌트를 리턴해준다는 의미이다.
//   // React.FC는 props.children 을 알아서 처리해준다! (children에 대한 타입은 정의할 필요 없다)
//   // 브라켓(<>) 은 타입스크립트에서 제네릭의 의미로 제네릭 함수에서 사용하는것처럼
//   // 함수의 input parameter의 타입정의를 props: T[] 처럼 할 필요는 없고,
//   // 브라켓 내부에서 props 의 타입을 정해준다. {} 는 props 라고 생각하고
//   // 내부에 items 타입을 정해주면 된다.
//   return (
//     <ul className={classes.todos}>
//       {props.items.map((item) => (
//         <TodoItem
//           key={item.id}
//           text={item.text}
//           // onRemoveTodo={() => props.onRemoveTodo(item.id)}
//           onRemoveTodo={props.onRemoveTodo.bind(null, item.id)} //위의 방법도 되고 이 방법도 된다
//         />
//       ))}
//     </ul>
//   );
// };

// 아래는 contextAPI 를 사용한 것이다
const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
