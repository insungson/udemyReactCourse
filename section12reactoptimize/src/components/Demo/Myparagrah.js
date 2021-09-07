import React from "react";

const MyParagragh = (props) => {
  console.log("MyParagragh RUNNING!");
  return <p>{props.children}</p>;
};

export default MyParagragh;
