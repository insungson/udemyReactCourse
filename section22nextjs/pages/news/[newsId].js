import { useRouter } from "next/router";

// ourdomain.com/news/아무거나가능 로 접근하면 자동으로 연결된다.

function DetailPage() {
  const router = useRouter();
  console.log("router: ", router);

  //[아무거나] 로 폴더를 만들면 아래와 같이 router.query.아무거나 로 하면 아무거나를 가져올 수 있다.
  //또한 ourdomain.com/news/아무거나가능?ho=123   일때는 router.query.ho 로 접근하면 123의 값을 가져올 수 있다.
  const newsId = router.query.newsId;

  return <h1>The Detail Page</h1>;
}

export default DetailPage;
