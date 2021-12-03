// 폴더 역시 [아무거나] 로하면 도메인/아무거나  로 접근이 가능해진다..
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://pbs.twimg.com/media/EF3NQYEXoAAL25U.jpg"
      title="A First Meetup"
      address="Some Street, Some City"
      description="The meetup description"
    />
  );
}

export default MeetupDetails;
