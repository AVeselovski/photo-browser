import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { fetchData } from "../../utils/api";
import { useQuery } from "../../utils/hooks";

import AlbumList from "../../components/common/AlbumList";
import Pagination from "../../components/common/Pagination";
import Loading from "../../components/common/Loading";

export default () => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const query = useQuery();
  const history = useHistory();

  const _setPage = (pageNum) => {
    const params = new URLSearchParams();

    params.append("_page", pageNum);
    history.push({ search: params.toString() });

    setPage(pageNum);
  };

  const _getAlbums = async (_page) => {
    setLoading(true);

    const LIMIT = 10;
    const response = await fetchData(`albums?_page=${_page}&_limit=${LIMIT}`);
    // const response = await mockData("albums");

    if (!response.error) {
      setAlbums(response?.data);
      setTotalPages(Math.ceil((response?.meta?.count || LIMIT) / LIMIT));
      setLoading(false);
    } else {
      setLoading(false);
      // show notification if there is time?
    }
  };

  useEffect(() => {
    const _page = Number(query.get("_page") || 1);

    setPage(_page);
    _getAlbums(_page);
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
      <div className="content">{loading ? <Loading /> : <AlbumList albums={albums} />}</div>
    </div>
  );
};
