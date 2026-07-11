import React from "react";
import { Pagination } from "@mui/material";

function PagePagination({ count, setPage }) {
  const changePage = (event, value) => {
    setPage(value);
  };
  return (
    <div>
      <Pagination onChange={changePage} count={count} color="primary" />
    </div>
  );
}

export default PagePagination;
