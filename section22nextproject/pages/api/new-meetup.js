import { MongoClient } from "mongodb";
// pages 폴더안에 api 폴더를 넣을때 그 내부의 js 파일들은 NextJS 에서 제공하는 API 라우팅 처리이다.
// 여기선 React 컴포넌트 함수를 만드는게 아니라, Server-side 코드로 만들어야 하는 것이다.

// /api/new-mmetup   으로 접근하면 지금의 파일에 있는 함수가 트리거 된다!!
// 이곳에선 새로 등록화는(POST 요청으로) 컴포넌트에 대한 API만 처리해보자!!
// req: incoming request 에 대한 정보를 가진 객체이다.
// res: sending back to response 에 대한 정보를 가진 객체이다.
async function handler(req, res) {
  // req.method 는 어떤 request가 요청되었는지를 찾는다.
  // 그래서 POST 방법으로  /api/new-meetup 으로 접근할때 아래의 조건에 부합되어 실행하게 된다!
  if (req.method === "POST") {
    //npm i mongodb   로 몽고디비 드라이버를 설치하고, (몽고디비 query 를 보내기 위함.)
    // https://cloud.mongodb.com/v2/615e58a6b008e633ac3ed254#clusters    에서 디비설정을 하자
    const data = req.body;

    const { title, image, address, description } = data;
    console.log("data: ", data);
    //여기서 try catch 문으로 에러핸들링을 해도 된다!
    //아래의 URL은 다른 프론트코드에서 공개하면 안되는것이다.. (외부접근이 가능하기 때문에...)
    // 참고로 NextJS가 알아서 MongoClient 관련 build시 client-side 에서 번들되지 않게 처리한다.
    const client = await MongoClient.connect(
      "mongodb+srv://test1:1q2w3e4r@cluster0.3lpdy.mongodb.net/nextjsmeetups?retryWrites=true&w=majority"
    );
    const db = client.db(); //db 메서드로 mongoDB SQL에 접근한다.

    //MongoDB 는 NOSQL 데이터베이스로 collections of documents 로 동작한다.
    //collection 은 SQL 데이터베이스의 tables 같은 것이고 documents 는 tables로 접근하는 진입점 같은 것이다.
    const meetupsCollection = db.collection("meetups");

    //MongoDB의 장점은 document에 객체로 값을 넣어도 된다는 점이다.
    const result = await meetupsCollection.insertOne(data);
    console.log("result: ", result);

    client.close();

    //아래에서 응답받은 데이터처리를 한다.
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
