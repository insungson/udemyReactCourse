import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting component", () => {
  //이곳의 문자열은 테스트 그룹 단위의 설명
  test("renders Hello World as a text", () => {
    //이곳의 문자열은 테스트 단위의 설명
    // Arrange (데이터 세팅 및 환경 테스트)
    render(<Greeting />);

    // Act (테스트 해야할 로직)
    // ... nothing

    // Assert (예상되어지는 결과와 비교)
    const helloWorldElement = screen.getByText("Hello World!");
    // screen 에는 getAllBy...  quertAllBy....  findAllBy.... 로 시작하는 함수들이 있다.
    // https://testing-library.com/docs/queries/about#types-of-queries
    //아래는 1개의 element를 찾을때 사용된다.
    // getBy함수: 해당 element와 매치되는 element를 찾고 해당 element를 리턴해준다, element가 없으면 에러발생
    // queryBy함수: 해당 element와 매치되는 element를 찾고 해당 element를 리턴해준다, element가 없으면 null 값을 리턴해준다.
    // findBy함수: 해당 element와 매치되는 element를 찾고 propmise 객체를 리턴해준다, element가 없으면 1000ms(default) 후에 promise 객체는 reject 되어진다,
    //아래는 2개이상의 element를 찾을때 사용된다.
    // getAllBy함수: getBy함수의 복수형이다.
    // queryAllBy함수: queryBy함수의 복수형이고, 해당 element가 없으면 [] 빈배열을 리턴해준다.
    // findAllBy함수: findBy 함수의 복수형이다.
    expect(helloWorldElement).toBeInTheDocument(); //toBeInTheDocument() 의미는 해당 DOM이 존재한다는걸 기대한다는 것이다.
  });

  test('renders "good to see" you if the button was NOT clicked', () => {
    // Arrange (데이터 세팅 및 환경 테스트)
    render(<Greeting />);

    // Act (테스트 해야할 로직)
    // ... nothing

    // Assert (예상되어지는 결과와 비교)
    const outputElement = screen.getByText("good to see you", { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  test('renders "Changed!" if the button was clicked', () => {
    // Arrange (데이터 세팅 및 환경 테스트)
    render(<Greeting />);

    // Act (테스트 해야할 로직)
    const buttonElement = screen.getByRole("button");
    //getByRole 은 화면에 button html element 가 있는지 확인해준다.
    userEvent.click(buttonElement);

    // Assert (예상되어지는 결과와 비교)
    const outputElement = screen.getByText("Changed!");
    expect(outputElement).toBeInTheDocument();
  });

  test('does not render "good to see you" if the button was clicked', () => {
    // Arrange (데이터 세팅 및 환경 테스트)
    render(<Greeting />);

    // Act (테스트 해야할 로직)
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert (예상되어지는 결과와 비교)
    // const outputElement = screen.getByText("good to see you", { exact: false });
    // expect(outputElement).not.toBeInTheDocument();
    // getByText 로 없는것을 찾으면 에러가 발생하므로 테스트 결과는 failed 로 뜰 것이다.
    // 그래서 아래와 같이 queryByText를 사용하고, 기대결과값(expect) 이 null 이라면 테스트 결과가 pass 처리가 된다
    const outputElement = screen.queryByText("good to see you", {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });

  // ***재밌는 점은 Greeting 컴포넌트에서 Output 컴포넌트로 감싼 부분도 같이 찾을 수 있다는 점이다.
});
