import Header from "./components/Layout/Header";
import React, { useState } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  //Cart 컴포넌트가 보여지고 안보여지고를 여기서 결정하기 떄문에 여기서 useState를 사용하여 state 관리를 해야한다!
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  //카트의 정보들이 다른곳에도 공유되기 때문에 아래와 같이 wrapper로 감싸준다!
  // 나중에 필요한 부분만 wrapper로 감싸는 처리를 해주면 된다!
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
