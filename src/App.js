import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  //for loading movies
  const [isLoading, setIsLoading] = useState(false);

  //state for error handling
  const[ error, setError ] = useState(null);

  //states for setting timer and Api calls
  const [ retry, setRetry ] = useState(false);
  //state to count how many times the timer ran to make api call
  const [ countRetry, setCountRetry ] = useState(0);

   useEffect(()=>{
    if(!retry){
      const timer = setTimeout(fetchMovieHandler, 5000);  //it helps to retry fetching the movie from server after 5milli sec
      return () => clearTimeout(timer);
    }
  }, [retry, countRetry])

  const fetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://swapi.dev/api/films/");
      //using the response to catch error before parsing the data
      if(!response.ok){
        throw new Error('Something went wrong ....Retrying');
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_data,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
      //resetting the retry state on a successful response
      setRetry(false);
    } catch (error) {
      setError(error.message);
      setRetry(true); // Retry on error
      setCountRetry((prevRetryCount) => prevRetryCount + 1);
      //making the retry stop if its greater than 5 sec
      if(countRetry >= 5){
        setRetry(false);
      } else {
        setRetry(true);
      }
    }
    setIsLoading(false);
  }, [countRetry]);


  useEffect(()=>{
    fetchMovieHandler();
  }, [fetchMovieHandler])
  
  //defining the cancel button handler for stopping to retry
  const cancelRetryHandler = () => {
    setRetry(false);
  }

  let content = <p>Movies not Found.</p>
  if(movies.length > 0){
    content = <MoviesList movies={movies} />;
  }
  if(error){
    content = <p>{error}</p>;
  }
  if(isLoading){
    content = <div className="parent-container">
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  </div>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
      {retry && (
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        )}
        {content} 
        {/* above we used a better way than the previous one to display messages to user for loading and error etc. */}
      </section>
    </React.Fragment>
  );
}

export default App;
