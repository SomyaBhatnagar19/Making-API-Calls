// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import MoviesList from "./components/MoviesList";
// import "./App.css";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [retry, setRetry] = useState(false);
//   const [countRetry, setCountRetry] = useState(0);

//   const [newMovieObj, setNewMovieObj] = useState({
//     title: "",
//     openingText: "",
//     releaseDate: "",
//   });
  
//   useEffect(() => {
//     if (!retry) {
//       const timer = setTimeout(fetchMovieHandler, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [retry, countRetry]);

//   const fetchMovieHandler = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const response = await fetch("https://swapi.dev/api/films/");

//       if (!response.ok) {
//         throw new Error("Something went wrong.... Retrying");
//       }

//       const data = await response.json();

//       const transformedMovies = data.results.map((movieData) => ({
//         id: movieData.episode_id,
//         title: movieData.title,
//         openingText: movieData.opening_crawl,
//         releaseDate: movieData.release_data,
//       }));

//       setMovies(transformedMovies);
//       setIsLoading(false);
//       setRetry(false);
//     } catch (error) {
//       setError(error.message);
//       setCountRetry((prevRetryCount) => prevRetryCount + 1);
//       if (countRetry >= 5) {
//         setRetry(false);
//       } else {
//         setRetry(true);
//       }
//     }
//     setIsLoading(false);
//   }, [countRetry]);

//   useEffect(() => {
//     fetchMovieHandler();
//   }, [fetchMovieHandler]);

//   const cancelRetryHandler = useCallback(() => {
//     setRetry(false);
//   }, []);

//   const content = useMemo(() => {
//     if (movies.length > 0) {
//       return <MoviesList movies={movies} />;
//     }
//     if (error) {
//       return <p>{error}</p>;
//     }
//     if (isLoading) {
//       return (
//         <div className="parent-container">
//           <div className="spinner-container">
//             <div className="loading-spinner"></div>
//           </div>
//         </div>
//       );
//     }
//     return <p>Movies not Found.</p>;
//   }, [movies, error, isLoading]);

//   const addMovieHandler = () => {
//     console.log(newMovieObj);
//   };

//   return (
//     <React.Fragment>
//       <section className="form-container">
//   <form>
//     <div className="form-field">
//       <label htmlFor="title">Title:</label>
//       <input
//         type="text"
//         id="title"
//         value={newMovieObj.title}
//         onChange={(event) =>
//           setNewMovieObj((prevMovieObj) => ({
//             ...prevMovieObj,
//             title: event.target.value,
//           }))
//         }
//       />
//     </div>
//     <div className="form-field">
//       <label htmlFor="openingText">Opening Text:</label>
//       <input
//         type="text"
//         id="openingText"
//         value={newMovieObj.openingText}
//         onChange={(event) =>
//           setNewMovieObj((prevMovieObj) => ({
//             ...prevMovieObj,
//             openingText: event.target.value,
//           }))
//         }
//       />
//     </div>
//     <div className="form-field">
//       <label htmlFor="releaseDate">Release Date:</label>
//       <input
//         type="text"
//         id="releaseDate"
//         value={newMovieObj.releaseDate}
//         onChange={(event) =>
//           setNewMovieObj((prevMovieObj) => ({
//             ...prevMovieObj,
//             releaseDate: event.target.value,
//           }))
//         }
//       />
//     </div>
//     <div className="form-button">
//       <button type="button" onClick={addMovieHandler}>
//         Add Movie
//       </button>
//     </div>
//   </form>
// </section>


//       <section>
//         <button onClick={fetchMovieHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {retry && <button onClick={cancelRetryHandler}>Cancel Retry</button>}
//         {content}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;
import React, { useState, useEffect, useCallback, useMemo } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);
  const [countRetry, setCountRetry] = useState(0);

  const [newMovieObj, setNewMovieObj] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });
  
  useEffect(() => {
    if (!retry) {
      const timer = setTimeout(fetchMovieHandler, 5000);
      return () => clearTimeout(timer);
    }
  }, [retry, countRetry]);

  const fetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong.... Retrying");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformedMovies);
      setIsLoading(false);
      setRetry(false);
    } catch (error) {
      setError(error.message);
      setCountRetry((prevRetryCount) => prevRetryCount + 1);
      if (countRetry >= 5) {
        setRetry(false);
      } else {
        setRetry(true);
      }
    }
    setIsLoading(false);
  }, [countRetry]);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  const cancelRetryHandler = useCallback(() => {
    setRetry(false);
  }, []);

  const content = useMemo(() => {
    if (movies.length > 0) {
      return <MoviesList movies={movies} />;
    }
    if (error) {
      return <p>{error}</p>;
    }
    if (isLoading) {
      return (
        <div className="parent-container">
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      );
    }
    return <p>Movies not Found.</p>;
  }, [movies, error, isLoading]);

  const addMovieHandler = () => {
    setMovies((prevMovies) => [...prevMovies, newMovieObj]);
  };
  

  return (
    <React.Fragment>
      <section className="form-container">
        <form>
          <div className="form-field">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={newMovieObj.title}
              onChange={(event) =>
                setNewMovieObj((prevMovieObj) => ({
                  ...prevMovieObj,
                  title: event.target.value,
                }))
              }
            />
          </div>
          <div className="form-field">
            <label htmlFor="openingText">Opening Text:</label>
            <input
              type="text"
              id="openingText"
              value={newMovieObj.openingText}
              onChange={(event) =>
                setNewMovieObj((prevMovieObj) => ({
                  ...prevMovieObj,
                  openingText: event.target.value,
                }))
              }
            />
          </div>
          <div className="form-field">
            <label htmlFor="releaseDate">Release Date:</label>
            <input
              type="text"
              id="releaseDate"
              value={newMovieObj.releaseDate}
              onChange={(event) =>
                setNewMovieObj((prevMovieObj) => ({
                  ...prevMovieObj,
                  releaseDate: event.target.value,
                }))
              }
            />
          </div>
          <div className="form-button">
            <button type="button" onClick={addMovieHandler}>
              Add Movie
            </button>
          </div>
        </form>
      </section>

      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {retry && <button onClick={cancelRetryHandler}>Cancel Retry</button>}
        {content}
        
      </section>
    </React.Fragment>
  );
}

export default App;
