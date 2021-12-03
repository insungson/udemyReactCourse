import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://pbs.twimg.com/media/EF3NQYEXoAAL25U.jpg",
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

//Layout 컴포넌트를 따로 만들었다면 기존처럼 아래와 같이 Wrapping 처리를 할 수 있다.
function HomePage() {
  return (
    // <Layout>
    <MeetupList meetups={DUMMY_MEETUPS} />
    // </Layout>
  );
}

export default HomePage;
