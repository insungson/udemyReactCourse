import React, { useState, useEffect, useCallback } from "react";

import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //스타워즈 API  https://swapi.dev/  참조함!
  function fetchMoviesHandler() {
    setIsLoading(true);
    //fetch(주소, 옵션) 옵션의 default 는 get 방식!
    fetch("https://swapi.dev/api/films") //fetch 함수는 내장함수이고 API로 데이터를 가져오는데
      .then((response) => response.json()) //결과값이 JSON 형식이므로 변환처리해준다
      .then((data) => {
        //여기서 필요한 데이터를 가공처리 해준다
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
        setIsLoading(false);
      });
  }
  //fetchMoviesHandler 를 async를 사용하여 바꿔보자 (코드를 좀 더 쉽게 파악할 수 있다)
  const fetchMoviesHandler1 = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      //여기서 url 주소를 바꿔서 에러헨들링이 동작하는지 체크

      if (!response.ok) {
        throw new Error("Something was wrong!");
      }

      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler1();
  }, [fetchMoviesHandler1]);
  // 만약 위처럼 dependency에 넣어서 사용하려면
  //  useCallback으로 묶어서 외부 state로 처리하면 무한루프가 안일어난다.

  async function addMovieHandler(movie) {
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-text-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie), // 자바스크립트 -> JSON 형태로 바꿔줌!
          headers: {
            "Content-Type": "application/json", //여기서 굳이 필요한건 아니지만.. 통상적으로 쓰니깐 써보자
          },
        }
      );
      const data = await response.json();
      console.log("Data", data);
      if (data) {
        const response = await fetch(
          "https://react-http-text-default-rtdb.firebaseio.com/movies.json"
        );
        if (!response.ok) {
          throw new Error("Something was wrong!");
        }
        const getData = await response.json();
        console.log("getData: ", getData);

        const addLoadedMovie = [];

        for (const key in getData) {
          addLoadedMovie.push({
            id: key,
            title: getData[key].title,
            openingText: getData[key].openingText,
            releaseDate: getData[key].releaseDate,
          });
        }

        setMovies((prev) => prev.concat(addLoadedMovie));
      }
    } catch (error) {
      setError(error.message);
    }
  }

  let content = <p>Found no movies.</p>;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (!isLoading && error) {
    content = <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler1}>Fetch Movies</button>
      </section>
      <section>
        {/* {isLoading && <p>Loading...</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>} */}
        {/* 깔끔하게 만들기 위해 위로 올릴수도 있다 */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
