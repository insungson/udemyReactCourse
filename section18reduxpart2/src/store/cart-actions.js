import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

//새로고침시 데이터를 가져오기 위한 처리!
export const fetchCartData = () => {
  return async (dispatch) => {
    //fetch데이터 자체를 try catch 문으로 처리하기 위해 아래의 변수로 처리
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-text-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      // // 아래처럼 처리하는것보다...이건 냅두고 try catch 에서 ||로 처리하는게 좋아보인다..
      // let data = await response.json();
      // if (!data.items) {
      //   data.items = [];
      // }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [], //이렇게
          totalAmount: cartData.totalAmount,
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};

// return {type: '', payload: ....}; 이런 형태로 action객체를 리턴해준다.
// 리덕스툴킷은 이런 형태를 cartSlice.actions 내부의 reducer 함수로 자동으로 만들어준다.(action creator 형태 비스무리)
// (굳이 tpye을 지정할 필요가없다!!)
export const sendCartData = (cart) => {
  // 리덕스 툴킷을 사용했기에 return {type: '', payload: ....}; 이런 형태가 아닌
  // return () => {}; 와 같은 함수를 사용할 수 있다.
  //아래의 dispatch는 리턴 이후 redux 내부에서 자동으로 dispatch를 처리해주기 떄문에 input으로 dispatch를 넣어준다
  //그래서 아래의 리턴함수 내부의 dispatch를 컴포넌트에서 다시 dispatch를 할 수 있는 것이다.
  //이런 사이트이팩(함수내부값이 외부의 action에 영향을 미치는)은 action creator에서 흔한 패턴이기 때문에 사용되어도 된다!
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    //try catch 문으로 코드를 좀더 쉽게 보기위해 아래의 함수를 만들자
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-text-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            //아래처럼 플레그인 changed를 제외한 바뀌는 데이터만 처리하여 서버로 보내면 좋다.
            items: cart.items,
            totalAmount: cart.totalAmount,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("sending cart data fail.");
      }
    };

    try {
      //sendRequest 함수가 promise 객체로 리턴되고 sendCartData 함수가 async로 감싸있기 때문에 await로 받는다.
      await sendRequest(); // sendRequest 함수내부에서 에러를 발생시키므로 에러발생시 catch로 넘어간다.

      dispatch(
        uiActions.showNotification({
          status: "success", //notification.js 에서 status 로 분기처리하기 때문에 문자열 맞춤
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};
