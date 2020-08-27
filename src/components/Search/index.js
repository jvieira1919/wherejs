import React, { useContext } from "react";
import "../styles/Search.css";
import Data from "../utils/Data";

const Search = () => {
  const context = useContext(Data);

  return (
    <div className="searchbox">
      <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">
              Search
            </span>
          </div>
          <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="name"
          aria-label="Search"
          onChange={e => context.handleSearchChange(e)}
        />
        </div>
    </div>
  );
}
export default Search;
© 2020 GitHub, Inc.