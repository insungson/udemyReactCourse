import React from "react"; //요즘 React 라이브러리에서 함수형 컴포넌트를 사용하는거라면 굳이 import React 를 할 필요가 없다.
import classes from "./TodoItem.module.css";

const TodoItem: React.FC<{ text: string; onRemoveTodo: () => void }> = (
  // 만약 여기서클릭 이벤트를 처리하는 작업이 있다면 아래와 같이 처리해 줘야 하지만..
  // onRemoveTodo: (event: React.MouseEvent) => void
  // 여기선 상위 컴포넌트에서 id 값을 받고 위에서 props.onRemoveTodo를 받기 때문에 굳이 이벤트 타입을 정해줋 필요가 없다
  props
) => {
  return (
    <li className={classes.item} onClick={props.onRemoveTodo}>
      {props.text}
    </li>
  );
};

export default TodoItem;
