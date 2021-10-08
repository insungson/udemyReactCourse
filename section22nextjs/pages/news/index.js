// ourdomain.com/news  로 접근하면 자동으로 연결된다.
import { Fragment } from "react";
import Link from "next/link";

function NewsPage() {
  return (
    <Fragment>
      <h1>The News Page</h1>
      <ul>
        <li>
          {/* 아래와 같이 접근해도 링크로 넘어가지만.. 
          a 태그를 사용할 경우 페이징 데이터를 불러오게 된다.
          (왼쪽 상단의 아이콘이 깜박이는것을 볼 수있는게 이게 페이지를 다시 불러오는 것이다.)
          이렇게 되면 굳이 SPA를 사용할 이유가 없어진다..
          <a href="/news/somthing?ho=123"></a> */}
          {/* 그래서 아래와 같이 a 태그 대신에 NextJS 에서 제공하는 Link 컴포넌트를 사용하면 
          기존의 server-side 랜더링의 이점을 사용하게 된다. */}
          <Link href="/news/amaing?yo=123">NextJs Is A Great Framework</Link>
        </li>
        <li>Something Else</li>
      </ul>
    </Fragment>
  );
}

export default NewsPage;
