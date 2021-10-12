// our-domain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    console.log("enteredMeetupData: ", enteredMeetupData);
    //**NextJS 는 폼에 있는 데이터를 아래의 URL 주소를 넣고(api로 접근) 요청 method 를 fetch 하여
    // Server-side render 처리를 해준다.(response 객체 핸들링을 /api/new-meetup 에서 핸들링해준다)
    // 더 중요한 점은 요청하는 API URL을 아래의 주소로 바꿀수 있다는 점이다!!(보안관련!!)
    // 예를 들어 실제서버API url이 '진짜API' 일때  fetch('진짜API',{포스트요청}) 이렇게 한다면
    // 실제 API가 client에서 노출되기 때문에 보안에 좀 더 불리하다면
    // NextJS의 api 라우터 기능을 사용하면 fetch('도메인/api/new-meetup',{포스트요청}) 이렇게 처리가
    // 되기 때문에 client에 실제 API 주소를 숨기게 된다!
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    //mongoDB에 데이터 추가 후 다른 화면 전환을 위해 아래와 같은 처리를 해준다!
    router.push("/");
  }

  //아래와 같이 페이징 별로 Head 처리를 할 수 있다!
  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup!</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
