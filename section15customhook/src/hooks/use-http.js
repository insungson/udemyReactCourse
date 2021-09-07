import React, { useState, useCallback } from "react";

const useHttp = () =>
  // requestConfig,
  // applyData
  // // 여기서 가져갈께 아니라 아래의 useCallback함수의 input 값으로 넣으면..
  // //굳이 dependency로 useCallback에 넣을 필요가 없다!!(이생각을 못했다...)
  // //위의 방법은 dependency를 최소화하고, 관리가 쉬워지는 효과가 있다
  {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //아래의 함수가 useEffect의 dependency에 들어가기 때문에 useCallback으로 감싸준다!

    const sendRequest = useCallback(async (requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        // 어떤 주소로 요청하는 로직은 유동적이다! (parameter 변수가 되어야 한다!)
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        //데이터를 적용시킬 함수를 가져온다!
        applyData(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    }, []);

    return {
      isLoading: isLoading,
      error: error,
      sendRequest: sendRequest,
    };
  };

export default useHttp;
