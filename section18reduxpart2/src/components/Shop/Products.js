import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCT = [
  {
    id: "p1",
    price: 6,
    title: "My First Book",
    description: "The First Book I evet wrote",
  },
  {
    id: "p2",
    price: 7,
    title: "My First Book1",
    description: "The First Book I evet wrote1",
  },
  {
    id: "p3",
    price: 8,
    title: "My First Book2",
    description: "The First Book I evet wrote2",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCT.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
