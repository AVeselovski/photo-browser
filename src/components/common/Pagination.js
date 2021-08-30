import React from "react";

const Pagination = ({
  page = 1,
  total = 1,
  previousPage = "",
  nextPage = "",
  firstPage = "",
  lastPage = "",
  changePage = () => {}
}) => {
  const prevDisabled = page == 1;
  const nextDisabled = page == total;

  const _changePage = (pageNum) => {
    if (pageNum < 1 || pageNum > total) return;

    changePage(pageNum);
  };

  return (
    <div className="pagination">
      <div className="pagination-page-count">
        {page} of {total}
      </div>
      <button
        className="button page-first"
        disabled={prevDisabled}
        title={firstPage || "First page"}
        onClick={() => _changePage(1)}>
        <span>&larr;&larr;</span>
        {firstPage && ` ${firstPage}`}
      </button>
      <button
        className="button"
        disabled={prevDisabled}
        title={previousPage || "Previous page"}
        onClick={() => _changePage(page - 1)}>
        <span>&larr;</span>
        {previousPage && ` ${previousPage}`}
      </button>
      <button
        className="button"
        disabled={nextDisabled}
        title={nextPage || "Next page"}
        onClick={() => _changePage(page + 1)}>
        {nextPage && `${nextPage} `}
        <span>&rarr;</span>
      </button>
      <button
        className="button page-last"
        disabled={nextDisabled}
        title={lastPage || "Last page"}
        onClick={() => _changePage(total)}>
        {lastPage && `${lastPage} `}
        <span>&rarr;&rarr;</span>
      </button>
    </div>
  );
};

export default Pagination;
