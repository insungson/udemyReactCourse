import React, { useMemo } from "react";

import classes from "./DemoList.module.css";

const DemoList = (props) => {
  const { items } = props;
  //useMemo를 사용하여 depth가 변할때만 랜더링 하도록 바꿔보자!
  const sortedList = useMemo(() => {
    console.log("Items sorted!");
    return items.sort((a, b) => a - b);
  }, [items]);
  console.log("DemoList is Running!!");
  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);
