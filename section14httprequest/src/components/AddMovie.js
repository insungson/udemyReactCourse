import React, { useRef } from "react";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
  const titleRef = useRef("");
  const openintTextRef = useRef("");
  const releaseDateRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here....

    const movie = {
      title: titleRef.current.value,
      openingText: openintTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(movie);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openintTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Realease Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <button>Add Moive</button>
    </form>
  );
}

export default AddMovie;
