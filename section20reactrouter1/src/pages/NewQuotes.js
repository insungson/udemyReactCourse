import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuotes = () => {
  const history = useHistory();
  // 해당 링크는 history 객체, 메서드를 통하여 작업을 진행할 수 있다.
  // https://reactrouter.com/web/api/history

  const { sendRequest, status } = useHttp(addQuote);

  //useEffect의 사이드 이팩(함수의 내부에서 외부환경변호)을 사용하여 status가 변할때마다 체크한다.
  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
      //push 는 history 스택이 쌓이므로 뒤로가기 버튼이 먹히고
      //replace 는 그게 안된다.
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
    console.log("quoteData: ", quoteData);
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuotes;
