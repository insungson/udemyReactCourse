import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
//useHistory 는 history 객체에 접근할 수 있고, history 객체는 URL 을 관리할 수 있다
//useLocation 은 location 객체에 접근할 수 있고, location 객체는 현재 로드된 URL 페이지 정보를 가지고 있다.

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

//아래는 sorting 함수
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  //(쿼리스트링은 라우팅 주소에 영향을 끼치지 않기 때문에 페이징관리는 기존대로 가능하다.)
  //(쿼리스트링은 이미 로드된 페이징을 쿼리스트링 변수에 맞게 바꾸기 위해 사용된다)
  //(ex_ 여기선 쿼리스트링을 조작하여 쿼리스트링을 통해서 해당 페이지에서 목록을 상위차순, 하위차순으로 정렬처리를 할 것이다. )
  const history = useHistory();
  const location = useLocation();

  console.log("history: ", history);
  // 위의 콘솔은 아래와 같이 뜬다.
  // action: "PUSH"
  // block: ƒ block(prompt)
  // createHref: ƒ createHref(location)
  // go: ƒ go(n)
  // goBack: ƒ goBack()
  // goForward: ƒ goForward()
  // length: 3
  // listen: ƒ listen(listener)
  // location: {pathname: '/quotes', search: '', hash: '', state: null, key: 'vgm51k'}
  // push: ƒ push(path, state)
  // replace: ƒ replace(path, state)

  console.log("location: ", location);
  // 현재 로드된 페이지의 URL 정보는 아래와 같다.
  // {pathname: '/quotes', search: '?sort=asc', hash: '', state: undefined, key: 'yfcm8b'}

  //아래의 함수는 자바스크립트 빌트인 함수로 URL의 searchparams를 구분해준다.
  const queryParams = new URLSearchParams(location.search);
  console.log('queryParams.get("sort"): ', queryParams.get("sort"));

  //쿼리스트링의 키값을 위에서 만든 객체의 get 메서드에 넣어 value를 구한다.
  const isSortingAscending = queryParams.get("sort") === "asc";

  //소팅된 목록
  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    //아래에서 history 객체를 통해 URL 관리 메서드를 싱행시키면 리랜더링이 된다.
    //이유는 React Router가 history 객체가 바뀐것을 인식하기 때문이다.
    //(컴포넌트가 재평가 되어 리랜더링 된다 _ 실제내용이 바뀌지 않더라도 마찬가지)
    // history.push(
    //   `${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    // );
    //아래처럼 사용해도 동작한다.
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
