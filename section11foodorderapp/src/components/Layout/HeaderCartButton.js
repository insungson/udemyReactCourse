import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
//위의 컴포넌트는 svg 만 사용하는 컴포넌트이다!
import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighLighted ? classes.bump : ""
  }`;

  //useEffect를 사용하여 카트에 추가시 범프! 되는 애니메이션을 추가한다.
  // 상태값의 변화를 감지하여 변화룰 줘야하기 때문에 useState가 필요하다!
  const { items } = cartCtx;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
      //아이템이 없을때 빈 return 처리를 하여 아래의 조건이 실행이 안되도록 막는다!
    }
    setBtnIsHighLighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);
    //해당 css 에서 아래와 같이 에니메이션 효과 시간이 300이기 때문에
    // 300 후에 초기화 시키기 위해 위와 같이 설정해준다
    // .bump {
    //   animation: bump 300ms ease-out;
    // }

    //아래는 타이머를 없애기 위한 클리어 함수로 쓴다!
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
