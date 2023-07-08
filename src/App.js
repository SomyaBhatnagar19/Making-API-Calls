import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  //for loading movies
  const [isLoading, setIsLoading] = useState(false);

  //state for error handling
  const[ error, setError ] = useState(null);
  const fetchMovieHandler = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://swapi.dev/api/film/");
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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Movies not found.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && (
          <div className="parent-container">
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          </div>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
