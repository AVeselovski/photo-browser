import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { fetchData } from "../../utils/api";
import { useQuery } from "../../utils/hooks";

import PhotoGrid from "../../components/common/PhotoGrid";
import Pagination from "../../components/common/Pagination";
import Loading from "../../components/common/Loading";

export default () => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const query = useQuery();
  const history = useHistory();

  const _setPage = (pageNum) => {
    const params = new URLSearchParams();

    params.append("_page", pageNum);
    history.push({ search: params.toString() });

    setPage(pageNum);
  };

  const _getPhotos = async (_page) => {
    setLoading(true);

    const LIMIT = 20;
    const response = await fetchData(`photos?_page=${_page}&_limit=${LIMIT}`);
    // const response = await mockData("photos");

    if (!response.error) {
      setPhotos(response?.data);
      setTotalPages(Math.ceil((response?.meta?.count || LIMIT) / LIMIT));
      setLoading(false);
      setError("");
    } else {
      setLoading(false);
      setError(response.error);
    }
  };

  useEffect(() => {
    const _page = Number(query.get("_page") || 1);

    setPage(_page);
    _getPhotos(_page);
  }, [page]);

  return (
    <div className="container">
      <div className="content-header">
        <div />
        <Pagination
          page={page}
          total={totalPages}
          previousPage="Prev"
          nextPage="Next"
          changePage={_setPage}
        />
      </div>
      <div className="content">{loading ? <Loading /> : <PhotoGrid photos={photos} error={error} />}</div>
    </div>
  );
};
