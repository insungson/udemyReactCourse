import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  // test("renders posts if request succeeds", async () => {
  //   // Arrange (데이터 세팅 및 환경 테스트)
  //   render(<Async />);

  //   // Act (테스트 해야할 로직)
  //   //nothing

  //   // Assert (예상되어지는 결과와 비교)
  //   const listItemElements = await screen.findAllByRole("listitem");
  //   // Async 컴포넌트에서 보면 listitem을 fetch로 요청해서 받아 map으로 돌려 보여주고 있다.
  //   // promise로 받은 listitem HTML element 가 있는지 찾기 위해 findAllBy 로 찾는것이다. (그래서 await 로 받음)
  //   // (find 로 시작하는 함수는 timeout이 있기 때문에 대기시간이 있다. default 1s 이다. http request를 기다려주기도 한다.)
  //   // 일반적이라면 getAllByRole 으로 찾는다.
  //   expect(listItemElements).not.toHaveLength(0);
  //   // length가 0이 아닌것을 기대한다.
  // });

  //*** 위의 방식으로 테스트 하는것은 문제가 있다!!
  //-> Async 컴포넌트에서 이미 서버로 데이터를 요청하고 응답받아 처리하는데,
  //  테스트를 하면서 또 서버로 요청할 경우 2가지 문제가 발생한다....
  // 1. 서버로 요청/응답을 자주하면 비용적인 문제가 발생하고,
  // 2. 테스트를 위한 요청이 서버의 DB에 저장되어 혼란을 야기시킬 수 있다..
  // 이에 대한 해결책으로 브라우저에 빌트인 된 fetch 함수를 사용할 수 있고 이는 mock 함수로 불리운다.
  // http 요청 뿐 아니라 localStorage 에서 처리하는 작업들도 mock 함수를 사용할 수 있다.
  // 실제로 localStorage에 테스트 시 잘못된 처리가 될 수 있으므로, jest 에선 test 용으로 이를 지원한다.
  // 아래에선 http 요청에 대해 처리해보자
  test("renders posts if request succeeds", async () => {
    //아래가 jest 에서 처리하는 http 더미 함수인 Mock 함수이다!!
    window.fetch = jest.fn(); //fn 은 mock 함수를 만들어준다
    window.fetch.mockResolvedValueOnce({
      //mockResolvedValueOnce 라는 이름을 그냥 mock 함수로 오버라이드 한 것이다.
      json: async () => [{ id: "p1", title: "First post" }],
      //Async 컴포넌트에서 json 으로 받기 때문에 response로 받는 형식을 위와 같이 맞춰줘야 한다!
    });

    // Arrange (데이터 세팅 및 환경 테스트)
    render(<Async />);

    // Act (테스트 해야할 로직)
    //nothing

    // Assert (예상되어지는 결과와 비교)
    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });

  // *** jest 는 자바스크립트 테스팅 라이브러리로 더 자세한건 아래의 참조에서 보고 정리하면 된다.
  // https://jestjs.io/docs/getting-started
});
