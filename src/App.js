import "./App.css";
import { useState, Suspense, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import { DataContext } from "./context/DataContext";
import { SearchContext } from "./context/SearchContext";
import ArtistView from "./components/ArtistView";
import AlbumView from "./components/AlbumView";
import { createResource as fetchData } from "./helper";
import { Fragment } from "react/cjs/react.production.min";

function App() {
  let searchInput = useRef("");
  let [data, setData] = useState(null);
  // eslint-disable-next-line
  let [message, setMessage] = useState("Search for Music!");

  const handleSearch = (e, term) => {
    e.preventDefault();
    setData(fetchData(term, "main"));
  };

  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery />
        </Suspense>
      );
    }
  };

  return (
    <div className="App">
      {message}
      <Router>
        <Fragment>
          <Routes>
            <Route exact path={"/"}>
              <SearchContext.Provider
                value={{ term: searchInput, handleSearch: handleSearch }}
              >
                <SearchBar />
              </SearchContext.Provider>
              <DataContext.Provider value={data}>
                {renderGallery()}
              </DataContext.Provider>
            </Route>
            <Route path="/album/:id">
              <AlbumView />
            </Route>
            <Route path="/artist/:id">
              <ArtistView />
            </Route>
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
