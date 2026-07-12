import React from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import API_URL from "../../config/api";
import "./SearchPage.css";

function SearchPage({ placeHolder, query, setQuery, handleSubmit }) {
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeHolder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSubmit} type="submit">
        <SearchIcon />
      </button>
    </form>
  );
}

export default SearchPage;
