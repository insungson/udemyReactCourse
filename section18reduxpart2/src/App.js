import React, { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import Notification from "./components/UI/Notification";

let isInitialFetch = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // //아래와 같이 리듀서에서 cart 가 바뀔때마다 서버에 바뀐 정보를 보내는것은 좋은 방법이다.
  // //다만.. 이미 저장된 카트데이터가 있을때도 아래의 로직은 초기값을 보내어 기존의 데이터를 overwrite 할 수 있다.
  // useEffect(() => {

  //     //처음 앱을 실행시킬때 success 가 뜨지 않게 하기위한 처리
  //     if (isInitialFetch) {
  //       isInitialFetch = false;
  //       return;
  //     }

  //   const sendCartData = async () => {
  //     //notification에 대한 state를 만들어도 되지만.. store에서 uislice를 만든만큼 여기서 작업을 하도록 하자!
  //     dispatch(
  //       uiActions.showNotification({
  //         //redux toolkit은 actioncreator의 역할을 알아서 처리해주기 때문에 편하다!
  //         status: "pending",
  //         title: "Sending.....",
  //         message: "Sending cart data!",
  //       })
  //     );

  //     const response = await fetch(
  //       "https://react-http-text-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("sending cart data fail.");
  //     }

  //     dispatch(
  //       uiActions.showNotification({
  //         status: "success", //notification.js 에서 status 로 분기처리하기 때문에 문자열 맞춤
  //         title: "Success!",
  //         message: "Sent cart data successfully!",
  //       })
  //     );
  //   };

  //   sendCartData().catch((error) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "error",
  //         title: "Error!",
  //         message: error.message,
  //       })
  //     );
  //   });

  //   //dispatch 는 함수이기 때문에 객체로 인식이되고 이건 useEffect를 돌리기위한 트리가가 되지 않는다!
  //   //dispatch도 useEffect 내부에서 사용되기 때문에 dependency에 넣어줘야 한다.
  // }, [cart, dispatch]);

  //새로고침 시 데이터를 가져오는 로직!
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  //커스텀 actionCreator인 Thunks 를 사용할때.. 아래처럼 사용된다.
  useEffect(() => {
    if (isInitialFetch) {
      isInitialFetch = false;
      return;
    }

    // reducer 에서 cart 가 변경될때만 change를 boolean으로 처리하여
    // 카트가 변경될때만 데이터를 보낸다!
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
