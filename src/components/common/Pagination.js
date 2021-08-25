import React from "react";

const Pagination = ({ page = 1, total = 1, previousPage = "", nextPage = "", changePage = () => {} }) => {
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
      <button className="button" disabled={prevDisabled} onClick={() => _changePage(page - 1)}>
        <span>&larr;</span>
        {previousPage && ` ${previousPage}`}
      </button>
      <button className="button" disabled={nextDisabled} onClick={() => _changePage(page + 1)}>
        {nextPage && `${nextPage} `}
        <span>&rarr;</span>
      </button>
    </div>
  );
};

export default Pagination;
