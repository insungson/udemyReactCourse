import { Route } from "react-router-dom";

const Welcome = () => {
  //이미 welcome 라우팅 주소 안이기 때문에.. welcome/news   처럼 더 들어가는건 되지만..
  // /products 같이 상위에 있는 라우팅 주소로는 접근할 수 없다!
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Route path="/welcome/new-user">
        <p>welcome!!</p>
      </Route>
    </section>
  );
};

export default Welcome;
