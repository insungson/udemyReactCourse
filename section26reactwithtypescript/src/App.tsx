import "./App.css";
import Todos from "./components/Todos";
import Todo from "./models/todo";
import NewTodo from "./components/NewTodo";
import { useState } from "react";

// // 아래의 코드는 useState 를 활용하여 props 로 하위컴포넌트로 넘겨주는 코드이다
// function App() {
//   const [todos, setTodos] = useState<Todo[]>([]);

//   // const todos = [new Todo("Learn React"), new Todo("Learn TypeScript")];

//   const addTodoHandler = (todoText: string) => {
//     const newTodo = new Todo(todoText);

//     setTodos((prevTodos) => {
//       return prevTodos.concat(newTodo);
//     });
//   };
//   const removeTodoHandler = (todoId: string) => {
//     setTodos((prevTodos) => {
//       return prevTodos.filter((todo) => todo.id !== todoId);
//     });
//   };
//   return (
//     <div>
//       <NewTodo onAddTodo={addTodoHandler} />
//       <Todos items={todos} onRemoveTodo={removeTodoHandler} />
//     </div>
//   );
// }

//아래는 contextAPI 를 사용한 코드이다
import TodosContextProvider from "./store/todos-context";

function App() {
  return (
    <TodosContextProvider>
      <NewTodo />
      <Todos />
    </TodosContextProvider>
  );
}

export default App;
