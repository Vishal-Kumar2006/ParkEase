import React from "react";
import { Pagination } from "@mui/material";

function PagePagination({ count, setPage }) {
  const changePage = (event, value) => {
    setPage(value);
  };
  return (
    <div className="PagePagination">
      <Pagination onChange={changePage} count={count} color="primary" />
    </div>
  );
}

export default PagePagination;
