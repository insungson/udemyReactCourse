import React, { useContext } from "react";
// import { useSelector } from 'react-redux';
import { ProductsContext } from "../context/products-context";
import { useStore } from "../hooks-store/store";

import FavoriteItem from "../components/Favorites/FavoriteItem";
import "./Products.css";

// const Favorites = props => {
//   const favoriteProducts = useSelector(state =>
//     state.shop.products.filter(p => p.isFavorite)
//   );
//   let content = <p className="placeholder">Got no favorites yet!</p>;
//   if (favoriteProducts.length > 0) {
//     content = (
//       <ul className="products-list">
//         {favoriteProducts.map(prod => (
//           <FavoriteItem
//             key={prod.id}
//             id={prod.id}
//             title={prod.title}
//             description={prod.description}
//           />
//         ))}
//       </ul>
//     );
//   }
//   return content;
// };

// //redux 가  아닌 context API를 사용하여 아래와 같이 바꿔주자!
// const Favorites = (props) => {
//   const favoriteProducts = useContext(ProductsContext).products.filter(
//     (p) => p.isFavorite
//   );
//   let content = <p className="placeholder">Got no favorites yet!</p>;
//   if (favoriteProducts.length > 0) {
//     content = (
//       <ul className="product-list">
//         {favoriteProducts.map((prod) => (
//           <FavoriteItem
//             key={prod.id}
//             id={prod.id}
//             title={prod.title}
//             description={prod.description}
//           />
//         ))}
//       </ul>
//     );
//   }
//   return content;
// };

//custom hook 을 사용하여 아래와 같이 바꿔주자!!
const Favorites = (props) => {
  const state = useStore()[0];
  const favoriteProducts = state.products.filter((p) => p.isFavorite);
  let content = <p className="placeholder">Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className="product-list">
        {favoriteProducts.map((prod) => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};
export default Favorites;
