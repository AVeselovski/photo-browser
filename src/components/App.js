import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { navLinks } from "../utils/links";

import { UiProvider } from "../context/UiContext";
import Header from "./common/Header";
import MobileNav from "./common/MobileNav";
import Loading from "./common/Loading";

const PhotosPage = lazy(() => import("../routes/photos"));
const PhotoPage = lazy(() => import("../routes/photos/photo"));
const AlbumsPage = lazy(() => import("../routes/albums"));
const AlbumPage = lazy(() => import("../routes/albums/album"));
const UsersPage = lazy(() => import("../routes/users"));
const UserPage = lazy(() => import("../routes/users/user"));

const Fallback = () => (
  <div className="container">
    <Loading />
  </div>
);

const NotFound = () => (
  <div className="container">
    <div className="empty error">404 | Page not found</div>
  </div>
);

const App = () => {
  return (
    <div>
      <UiProvider>
        <Header links={navLinks} />
        <MobileNav links={navLinks} />
      </UiProvider>
      <main>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Redirect exact path="/" to="/photos" />
            <Route exact path="/photos" component={PhotosPage} />
            <Route path="/photos/:id" component={PhotoPage} />
            <Route exact path="/albums" component={AlbumsPage} />
            <Route path="/albums/:id" component={AlbumPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route path="/users/:id" component={UserPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <footer>
        <span>
          Repo:{" "}
          <a href="https://github.com/AVeselovski/photo-browser" target="_blank">
            photo-browser
          </a>
        </span>
      </footer>
    </div>
  );
};

export default App;
