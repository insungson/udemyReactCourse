import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const params = useParams();
  console.log("params: ", params);
  //useParams 를 사용하면 해당 params로 접근할 수 있다.
  // 만약 도메인/product-detail/1 로 접근하면 아래와 같이 콘솔에 뜬다.
  // {productId: '1'}
  //productId 는 주소의 도메인/:productId  로 설정했기 때문에 이렇게 뜬다.

  return (
    <section>
      <h1>Product Detail</h1>
      <p>{params.productId}</p>
    </section>
  );
};

export default ProductDetail;
