import React, { memo, useContext } from "react";
import { useDispatch } from "react-redux";

import Card from "../UI/Card";
import "./ProductItem.css";
// import { toggleFav } from '../../store/actions/products';
import { ProductsContext } from "../../context/products-context";
import { useStore } from "../../hooks-store/store";

const ProductItem = memo((props) => {
  // const dispatch = useDispatch();
  // const toggleFav = useContext(ProductsContext).toggleFav;
  const dispatch = useStore(false)[1]; //자세한건 useStore 내부에서 봐야 한다.
  console.log("Rendering");
  // React.Memo 로 Wrapper 처리하고,
  // useStore 함수의 input으로 받을때 flag 를 설정하여
  // 기존의 state에서 바뀌는 부분만 참조하게 만들어 React.memo가 동작하게 만들자

  const toggleFavHandler = () => {
    // dispatch(toggleFav(props.id));
    // toggleFav(props.id);
    dispatch("TOGGLE_FAV", props.id);
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={toggleFavHandler}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
