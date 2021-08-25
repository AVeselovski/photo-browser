import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { fetchData } from "../../utils/api";

import Loading from "../../components/common/Loading";
import PhotoGrid from "../../components/common/PhotoGrid";

export default () => {
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [username, setUsername] = useState(null);

  const history = useHistory();
  const params = useParams();

  const _goBack = () => {
    history.goBack();
  };

  const _getAlbum = async () => {
    setLoading(true);

    const response = await fetchData(`albums/${params?.id}`);
    // const response = await mockData("album");

    if (!response.error) {
      setAlbum(response?.data);
      setLoading(false);
      _getUser(response?.data?.userId);
    } else {
      setLoading(false);
      // show notification if there is time?
    }
  };

  const _getAlbumPhotos = async () => {
    setLoading(true);

    const response = await fetchData(`albums/${params?.id}/photos`);
    // const response = await mockData("photos");

    if (!response.error) {
      setAlbumPhotos(response?.data);
      setLoading(false);
    } else {
      setLoading(false);
      // show notification if there is time?
    }
  };

  const _getUser = async (id) => {
    const response = await fetchData(`users/${id}`);
    // const response = await mockData("user");

    if (!response.error) {
      setUsername(response?.data?.username);
    } else {
      setUsername("Username");
      // show notification if there is time?
    }
  };

  useEffect(() => {
    /**
     * Whichever _get function finishes first will reset loading state and this is fine, as there is data to show.
     * This is totally a thought out feature and not me being too lazy to implement Promise.all call... /s
     */
    _getAlbum();
    _getAlbumPhotos();
  }, []);

  return (
    <div className="container">
      <div className="content-header">
        <button className="button" onClick={_goBack}>
          &larr; Back
        </button>
      </div>
      <div className="content">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="hello-card">
              <h1 className="title">{album?.title}</h1>
              By: {!username ? "..." : <Link to={`/users/${album?.userId}`}>{username}</Link>}
            </div>
            <div className="content">
              <PhotoGrid photos={albumPhotos} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
