import { Fragment, useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
//useRouteMatch 는 useLocation 과 비슷한데 현재 로드된 route 에 대한 정보가 더 많이 있다.
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

import Comments from "../components/comments/Comments";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const DUMMY_QUOTES = [
  { id: "q1", author: "Max", text: "Learning React is fun!" },
  { id: "q2", author: "Max1", text: "Learning React is great!" },
];

const QuoteDetail = () => {
  const params = useParams();
  console.log("params: ", params);
  // {quoteId: '-MkkOMywsETHM3BEUTiR'}
  const match = useRouteMatch();
  console.log("match: ", match);
  // useRouteMatch 를 통해 얻어넨 객체는 아래의 정보를 가지고 있다..
  // {isExact: true, params: {quoteId: 'q1'}, path: "/quotes/:quoteId", url: "/quotes/q1"}
  // !!이중 삼중 라우팅 구조를 짤땐 하드코딩(문자열)으로 입력하는것은 추후 유지보수에 문제가 생긴다.
  // 그래서!! 위의 객체에서 url 과 path 의 정보를 얻을수 있기 때문에 이를 사용하여 이중,삼중 라우팅주소처리를 하도록 하자!

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  //이렇게 spread로 펼쳐야 아래의 useEffect에서 넣어야 하는 인자만 dependency에 넣을 수 있다.
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No Quote Found!</p>;
  }

  //!아래와 같이 nested 구조로 route 를 짜면 comment 컴포넌트 로드를
  // 복잡한 state로 만든 로직이 아닌 route 구조로 불러올 수 있다.
  // <Route path={`/quotes/${params.quoteId}`} exact>
  //위와 같이 하드코딩을 하는것보단 useRouteMatch 를 통해 경로를 얻는게 추후 유지관리측면에서 더 좋다.
  // <Route path={} exact>

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
      {/* <Route path='/quotes/:quoteId/comments'>
      <p>Dynamic 테스트!이렇게 해도 위와 같이 된다!!</p>
    </Route> */}
    </Fragment>
  );
};

export default QuoteDetail;
