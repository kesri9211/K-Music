import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // State variables
  const [keyword, setKeyword] = useState(""); // State variable for search keyword
  const [isLoad, setIsLoad] = useState(true); // State variable to track loading status
  const [tracks, setTracks] = useState([]); // State variable to store fetched tracks

  // Function to fetch tracks from the API
  const getTrack = async () => {
    setIsLoad(true); // Set loading status to true
    try {
      // Fetch tracks based on the keyword from the API
      let data = await fetch(
        `https://v1.nocodeapi.com/kesri9211/spotify/xRqZqYGBzneMcAgn/search?q=${
          keyword === "" ? "trending" : keyword
        }&type=track`
      );
      let conData = await data.json();
      console.log(conData.tracks.items);
      setTracks(conData.tracks.items); // Set fetched tracks to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoad(false); // Set loading status to false
  };

  // Effect hook to fetch tracks on initial render
  useEffect(() => {
    getTrack();
  }, []);

  return (
    <>
      <div>
        {/* Navigation bar */}
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">K-MUSIC</a>
            {/* Search form */}
            <form className="d-flex" role="search">
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)} //imp
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={getTrack} //imp
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>

      <div className="container">
        {/* Loading spinner */}
        <div className={`row ${isLoad ? "" : "d-none"} `}>
          <div className="col-12">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>

        {/* Display fetched tracks */}
        <div className="row">
          {tracks.map((track) => (
            <div key={track.id} className="col-lg-4 col-md-6 py-2">
              <div className="card">
                <img
                  src={track.album.images[0].url}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{track.name}</h5>
                  <p className="card-text">Artist: {track.album.artists[0].name}</p>
                  <p className="card-text">Release: {track.album.release_date}</p>
                  <audio src={track.preview_url} controls className="w-100"></audio>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
