import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { fetchData } from "../../utils/api";

import Loading from "../../components/common/Loading";
import AlbumList from "../../components/common/AlbumList";

export default () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userAlbums, setUserAlbums] = useState([]);
  const history = useHistory();
  const params = useParams();

  const _goBack = () => {
    history.goBack();
  };

  const _getUser = async () => {
    setLoading(true);

    const response = await fetchData(`users/${params?.id}`);
    // const response = await mockData("user");

    if (!response.error) {
      setUser(response?.data);
      setLoading(false);
    } else {
      setLoading(false);
      // show notification if there is time?
    }
  };

  const _getUserAlbums = async () => {
    setLoading(true);

    const response = await fetchData(`users/${params?.id}/albums`);
    // const response = await mockData("albums");

    if (!response.error) {
      setUserAlbums(response?.data);
      setLoading(false);
    } else {
      setLoading(false);
      // show notification if there is time?
    }
  };

  useEffect(() => {
    /**
     * Whichever _get function finishes first will reset loading state and this is fine, as there is data to show.
     * This is totally a thought out feature and not me being too lazy to implement Promise.all call... /s
     */
    _getUser();
    _getUserAlbums();
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
              <h1 className="title">{user?.name}</h1>
              <p>Goes by: {user?.username}</p>
            </div>
            <div className="content">
              <AlbumList albums={userAlbums} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
