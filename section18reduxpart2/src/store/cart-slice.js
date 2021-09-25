import { createSlice } from "@reduxjs/toolkit";

//!!!@@ 절대 reducers내부의 함수에서 async 함수를 사용해선 안된다!!
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false, //새로고침할때는 false처리(replaceCart 시 false), cart가 바뀔때는 true(add,remove시 true)
    totalAmount: 0, //이프로젝트엔 없지만 내가 개인적으로 추가해보자
  },
  reducers: {
    //아래의 리듀서는 그냥 state를 교체해주는 작업만 담당한다!
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice =
            existingItem.totalPrice - existingItem.price;
        }
      }
    },
  },
});

//리덕스 툴킷은.. 위에서 reducer 함수를 만들면 아래와 같이 action creator 함수를 만들어준다.
export const cartActions = cartSlice.actions;

export default cartSlice;
