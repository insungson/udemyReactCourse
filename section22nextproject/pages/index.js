import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";
import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image: "https://pbs.twimg.com/media/EF3NQYEXoAAL25U.jpg",
    address: "Some Address5, 12345 some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile5.uf.tistory.com%2Fimage%2F9974403B5E5A1A7127DCC3",
    address: "Some Address5, 12345 some City",
    description: "This is a Second meetup!",
  },
];

// // 아래의 주석처리된 HomePage 컴포넌트는 기존의 React 방식으로 Data-Fetching 처리를 한 것이다.
// //Layout 컴포넌트를 따로 만들었다면 기존처럼 아래와 같이 Wrapping 처리를 할 수 있다.
// function HomePage() {
//   const [loadedMeetups, setLoadedMeetups] = useState([]);

//   //NextJS의 특징인 pre-rendering에도 문제가 있다. ** 기존 React 방식대로 Data-Fetching 을 할때 나타나는 문제점!!
//   //아래와 같이 데이터를 fetching 하면 NextJS 의 pre-rendering 특징상
//   //data fetching 이전에 빈 페이지만 로딩되어 서치엔진의 이점이 없어지게 된다.
//   //(useEffect 는 한번 리턴에서 랜더링 된 후 데이터를 fetch 하여 가져와서 넣는 것이므로
//   //pre-rendering 처리가 되지 않는다.)
//   useEffect(() => {
//     // send a http request and fetch data
//     setLoadedMeetups(DUMMY_MEETUPS);
//   }, []);

//   return (
//     // <Layout>
//     <MeetupList meetups={loadedMeetups} />
//     // </Layout>
//   );
// }

// 아래의 HomePage 컴포넌트는 NextJS에서 제공하는 Data-Fetching 방식으로 처리한 것이다.
// NextJS 에서 Head 관리를 할 수 있는 컴포넌트를 제공한다!!
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups!!</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

//Next 에서 제공하는 pre-fetching rendering은 다른 폴더가 아닌 pages 폴더에서 아래와 같이 작업을 해줘야 한다.
//(*getStaticProps 는 page 컴포넌트 단위에서 랜더링할때 pre-fetching data & pre-rendering 에 최적화 되어있다.)
// 함수명은 getStaticProps 로 픽스되어있다!!
// NextJS 에서 아래의 함수명을 사용할때 pre-rendering 하는 동안 해당 함수가 동작하게 된다! (client가 아닌 server에서 동작한다)
// 위의 HomePage 컴포넌트 함수를 사용하기 전에 getStaticProps 함수를 먼저 사용한다!
// 그러므로!! 아래의 함수에서 데이터를 fetching 하고 props 로 넘겨주면 위의 HomePage컴포넌트에서 이 데이터를
// props로 받아서 사용할 수 있는 것이다!! (굳이 useEffect, useState를 통해 data-fetching 작업을 할 필요가 없다!!)
export async function getStaticProps() {
  //* getStaticProps 내부에서 실행된 함수는 client-side에서 실행되는것이 아니라 build process 중 실행이 된다!
  //  (server나 client에서 실행되는게 아니다!!)

  //fetch data from an API
  //** tip!!  getStaticProps 는 client-side 가 아닌 server-side 에서 동작하기 때문에 굳이 api 폴더에서 처리할 필요가 없다.
  const client = await MongoClient.connect(
    "mongodb+srv://test1:1q2w3e4r@cluster0.3lpdy.mongodb.net/nextjsmeetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups"); //관련 DB collection에 접근한다!

  const meetups = await meetupsCollection.find().toArray(); //find: 모든 데이터를 불러오는 함수이다, toArray: 배열로 리턴해준다.

  client.close(); //몽고디비 접속 종료처리!

  return {
    props: {
      //mongoDB 는 객체형식의 ID로 데이터를 관리하기 때문에 toString으로 바꿔주는 작업을 해야한다.
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(), //문자열로 바꿔주는 작업이 필요하다.
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 5, // In seconds
    //revalidate 옵션의 내용 참조
    //https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
    //https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration   (예시)
    //https://vercel.com/docs/concepts/next.js/incremental-static-regeneration  (동작원리)
  };
}

// //NextJs에서 제공하는 server-side rendering에 대한 메서드인 getServerSideProps() 메서드에 대해 알아보자
// //getStaticProps 와 getServerSideProps 의 차이점은 getServerSideProps 는 빌드중에는 실행되지 않고, deployment 후 서버에서 실행된다.
// //getStaticProps처럼 prop를 리턴해주면 해당 컴포넌트에서 props로 받아서 처리해준다.
// export async function getServerSideProps(context) {
//   //context 객체에서 req 는 서버에 요청할때 authentication 인증이 처리된 정보를 헤더에 실어 보낼수 있어 편리하다.
//   const req = context.req;
//   const res = context.res;
//   //fetch data from an API

//   //역시 여기도 client가 아닌 server에서 실행된다.
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     //getServerSideProps 는 모든 요청이 들어올때마다 동작하기 때문에 굳이 revalidate 를 설정할 필요가 없다.
//   };
// }

// getServerSideProps VS getStaticProps  어떤 경우에 사용해야할까?
//-> 얼마나 자주 데이터가 바뀌는지, request Obj에 접근할 필요가 있는지 유무에 따라 결정한다.
//getServerSideProps 는 모든 요청에 대한 동작을 하고
//getStaticProps 는 모든 요청에 대한 동작 + revalidate 옵션으로 설정한 초 시간 단위로 페이지가 re-generate(재실행) 된다.
//언뜻 보면 getServerSideProps 가 더 합리적인것 같다..
//하지만!! 요청이 없는 상황에서 pre-fetched 된 데이터를 바꿔서 보여주는 상황이라면(해당 데이터가 revalidate 가 필요한 상황) getStaticProps 가 더 합리적인 선택이다!(더 빠르다!!)
//반면!! 데이터 요청시 req 가 고정된 객체로 이뤄진 상황(예를 들어 인증된 객체)일때는 context.req 를 통해 쉽게 data-fetch가 되기 때문에 합리적이다.
// 그리고 요청받은 데이터로 계속 바뀌고, 해당 데이터가 revalidate 가 필요없는 상황이라면 getServerSideProps 가 더 합리적이다!

export default HomePage;
