import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  //App.js 의 데이터를 가져오는 로직과 같진 않지만 loading과 state를 처리하는 과정이
  //유사하기 때문에 App.js 에도 같은 custom hook을 적용시킬 수 있다.

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // 아래의 함수를 bind를 사용하여 실행시점을 나중으로 만들어 사용할 수 있다.
  // https://ko.javascript.info/bind#ref-818   참조
  const createTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    // //아래와 같이 사용해도 잘 동작은 하지만.. bind의 부분적용을 사용해보자!
    // const createTask = (data) => {
    //   const generatedId = data.name; // firebase-specific => "name" contains generated id
    //   const createdTask = { id: generatedId, text: taskText };

    //   props.onAddTask(createdTask);
    // };

    sendTaskRequest(
      {
        url: "https://react-http-text-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      //아래에서 bind를 사용하여 처음엔 null 을 넣어 평가를 미룬다.
      //createTask()의 첫번째 인자만 받고 나머진 나중에
      //실행할때(customHook으로 만든 sendRequest 내부에서 처리) 받도록 처리한다.
      createTask.bind(null, taskText)
    );

    // setIsLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(
    //     "https://react-http-text-default-rtdb.firebaseio.com/tasks.json",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({ text: taskText }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Request failed!");
    //   }

    //   const data = await response.json();

    //   const generatedId = data.name; // firebase-specific => "name" contains generated id
    //   const createdTask = { id: generatedId, text: taskText };

    //   props.onAddTask(createdTask);
    // } catch (err) {
    //   setError(err.message || "Something went wrong!");
    // }
    // setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
