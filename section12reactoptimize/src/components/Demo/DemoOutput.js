import React from "react";
import MyParagragh from "./Myparagrah";

const DemoOutput = (props) => {
  console.log("DemoOutput RUNNING!");
  return <MyParagragh>{props.show ? "This is New!" : ""}</MyParagragh>;
};

//아래와 같이 React.memo() 로 감싸고 상위컴포넌트에서 넘겨주는 값이 바뀌지않는다면 위의 콘솔은 찍히지 않을 것이다!!
export default React.memo(DemoOutput);
// export default DemoOutput;
