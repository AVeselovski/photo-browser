import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { fetchData } from "../../utils/api";

import Loading from "../../components/common/Loading";

export default () => {
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);

  const history = useHistory();
  const params = useParams();

  const _goBack = () => {
    history.goBack();
  };

  const _getPhoto = async () => {
    setLoading(true);

    const response = await fetchData(`photos/${params?.id}`);
    // const response = await mockData("photo");

    if (!response.error) {
      setPhoto(response?.data);
      setLoading(false);
    } else {
      setLoading(false);
      // show notification if there is time?
    }
  };

  useEffect(() => {
    _getPhoto();
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
            <div className="img-container">
              <img src={photo?.url} />
            </div>
            <div className="description">
              <h1 className="title">{photo?.title}</h1>
              <Link to={`/albums/${photo?.albumId}`}>Go to album &rarr;</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
