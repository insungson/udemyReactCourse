import { useDispatch, useSelector } from "react-redux";

import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { title, price, description, id } = props;

  const addToCartHandler = () => {
    //아래의 코드를 위해 잠깐 주석처리함
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
    // //만약 사이드이팩(코드가 외부 세계에 영향을 주거나 받는 것이다.)에서 자유롭고,
    // //동기적으로 코드를 처리한다고 하면 아래의 로직으로 카트에 아이템을 추가해야한다,.
    // //(위의 dispatch 는 주석처리로 생각하고 아래의 코드진행!)
    // //리듀서 state는 새로운 메모리로 잡아야처리해야 하기 때문에 아래와 같이 새로운 객체변수에 할당해준다.
    // const newTotalQuantity = cart.totalQuantity + 1;
    // const updatedItems = cart.items.slice(); //원래의 state 불변성을 피하기 위해서 slice로 복사하여 변수에 할당!
    // const existingItem = updatedItems.find((item) => item.id === id);
    // if (existingItem) {
    //   const updatedItem = { ...existingItem }; //state의 불변성을 처리하기 위해 New Object + copy existing properties 를 해준다.
    //   updatedItem.quantity++;
    //   updatedItem.totalPrice = updatedItem.totalPrice + price;
    //   const existingItemIndex = updatedItems.findIndex(
    //     item => item.id === id
    //   );
    //   updatedItems[existingItemIndex] = updatedItem;
    // } else {
    //   updatedItems.push({
    //     id: id,
    //     price: price,
    //     quantity:1,
    //     totalPrice:price,
    //     name: title,
    //   });
    // }

    // const newCart = {
    //   totalQuantity: newTotalQuantity,
    //   items: updatedItems,
    // };

    // dispatch(cartActions.replaceCart(newCart));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
