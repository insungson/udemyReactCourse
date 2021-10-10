import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";
//NextJS 에서 위와 같이 클래스를 관리하면 이 클래스는 컴포넌트에서만
//스코프로 작용하여 여기서만 유니크하게 사용될 수 있다.
// 그러므로 클래스를 정하여 css를 먹일때 굉장히 유용하게 사용될 수 있는 것이다!
//다만 NextJS의 특성상 라우터 기능을 하는 page 폴더가 아닌
//다른 폴더(components 같은..)를 만들고 거기서 이렇게 작업하는것이다.

function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;
