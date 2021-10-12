// 폴더 역시 [아무거나] 로하면 도메인/아무거나  로 접근이 가능해진다..
import { Fragment, useEffect, useState } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
  // useRouter 는 컴포넌트 내부에서만 사용가능하다!!
  // Head 는 아래와 같이 다이네믹하게 사용할 수도 있다.
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

// dynamic SSG pages에서 getStaticPaths 메서드를 사용하지 않는다면 아래와 같은 에러가 뜬다!!
// Server Error
// Error: getStaticPaths is required for dynamic SSG pages and is missing for '/[meetupId]'.
// Read more: https://err.sh/next.js/invalid-getstaticpaths-value
//getStaticPaths 메서드가 필요한 이유는 동적인 ssg page에서 pre-rendering 을 하기 위해선 해당 페이지ID를 알아야
//pre-generated 을 할 수 있기 때문이다.
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://test1:1q2w3e4r@cluster0.3lpdy.mongodb.net/nextjsmeetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  //_id:1 은 _id 를 포함한 데이터를 가져오기 위함이다!!
  client.close();
  //첫번째 객체{}: 빈 객체 대신 filter 조건을 넣어줄 수도 있다.
  //두번째 객체{}: 저장된 테이블의 필드명과 일치하는 값을 넣어 해당값만 불러온다.
  // # db.<콜렉션 이름>.find({},{"<표시할 field>":1, "<표시하지 않을 field>":0})
  // # {}는 첫번째 인자인 검색 쿼리
  // # "_id"는 입력하지 않을 경우, default로 나옴.
  // # 나머지는 입력하지 않을 경우, default로 나오지 않음.
  // > db.imlmdb.find({},{_id:0,name:1})
  // { "name" : "IML" }
  // { "name" : "kim" }
  // { "name" : "lim" }
  // { "name" : "chan" }

  // > db.imlmdb.find({},{name:1})  # {_id:1} 을 해도 같은 결과
  // { "_id" : ObjectId("5b17b49770c8aa934728221e"), "name" : "IML" }
  // { "_id" : ObjectId("5b17c63c70c8aa9347282221"), "name" : "kim" }
  // { "_id" : ObjectId("5b17c64570c8aa9347282222"), "name" : "lim" }
  // { "_id" : ObjectId("5b17c65070c8aa9347282223"), "name" : "chan" }

  // https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=shino1025&logNo=221293123637    참조

  return {
    fallback: "blocking", // 기준은 빌드 타임에 생성해놓지 않은 path로 요청이 들어온 경우 어떻게 할지 정하는 boolean 또는 'blocking' 값이다
    // false로 할 경우: pre-generated 된 페이지가 build process 중 실행이 되기 때문에 배포 후 새로 만든 페이지에 대한 정보가 DB에
    // 저장은 되지만 배포된 paths 목록이 업데이트 안되고, paths에 포함된 목록이 아니라면 fail 처리가 되어 NextJS 자체적으로 404 페이지를 보여준다.
    // true로 할 경우: list of paths 가 정확하지 않고 더 많은 페이지가 있다고 인식된다.  그래서 paths 목록에 없더라도 자체적인 404 페이지가 뜨지 않고,
    // 해당 페이지 정보가 pre-generated 되기전 (커스텀하게 만든) 로딩 페이지를 보여줄 수 있다.
    // blocking으로 할 경우: true와 같고 (커스텀하게 만든) 로딩 페이지가 없고 pre-generated 된 이후의 페이지를 보여준다.

    // 주소를 m3로 해서 true/false 값을 비교해보자
    // https://velog.io/@mskwon/next-js-static-generation-fallback   (설명 잘 해놓음!!)
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

// 여기서 보여주는 meetupData 는 자주 바뀌지 않기 때문에(초단위로 여러번 바뀌는 경우가 아니다)
// getStaticProps 이 getServerSideProps 보다 더 나은 선택으로 보인다.
// 해당페이지는 다이네믹 페이지라우터([] 로된!!) 이므로 해당 id 를 알아야 제대로된 fetch를 통해 요청한다.
export async function getStaticProps(context) {
  console.log("context: ", context);
  //context 콘솔은 아래와 같이 찍힌다.
  // context:  {
  //   params: { meetupId: 'm1' },
  //   locales: undefined,
  //   locale: undefined,
  //   defaultLocale: undefined
  // }
  const meetupId = context.params.meetupId;
  //fetch data for a single meetup
  const client = await MongoClient.connect(
    "mongodb+srv://test1:1q2w3e4r@cluster0.3lpdy.mongodb.net/nextjsmeetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  //몽고디비는 _id 가 객체로 되어있기 때문에 이렇게 객체로 바꿔줘야 한다.
  console.log("selectedMeetup: ", selectedMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.image,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
      // {
      //   id: meetupId,
      //   image: "https://pbs.twimg.com/media/EF3NQYEXoAAL25U.jpg",
      //   title: "A First Meetup",
      //   address: "Some Street, Some City",
      //   description: "The meetup description",
      // },
    },
  };
}

export default MeetupDetails;
