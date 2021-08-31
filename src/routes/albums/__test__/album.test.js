import * as React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import user from "../../../test/fixtures/user";
import album from "../../../test/fixtures/album";
import photos from "../../../test/fixtures/photos";

import AlbumPage from "../album";

const WrappedAlbumPage = ({ history = null, ...props }) => {
  const defaultHistory = createMemoryHistory();

  return (
    <Router history={history || defaultHistory}>
      <AlbumPage {...props} />
    </Router>
  );
};

describe("Album page:", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Should show loader initially, then display the album", async () => {
    fetch.mockResponseOnce(JSON.stringify(album));
    fetch.mockResponseOnce(JSON.stringify(photos));
    fetch.mockResponseOnce(JSON.stringify(user));
    render(<WrappedAlbumPage />);

    const loading = await screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();

    const albumItem = await screen.findByRole("heading", { name: album.title });
    expect(albumItem).toBeInTheDocument();
  });

  it("Should navigate back to /albums after clicking on a back button", async () => {
    const history = createMemoryHistory({ initialEntries: ["/albums", "/albums/1"] });

    fetch.mockResponseOnce(JSON.stringify(album));
    fetch.mockResponseOnce(JSON.stringify(photos));
    fetch.mockResponseOnce(JSON.stringify(user));
    render(<WrappedAlbumPage history={history} />);

    const albumItem = await screen.findByRole("heading", { name: album.title });
    expect(albumItem).toBeInTheDocument();

    const goBack = screen.getByText(/Back/i);
    userEvent.click(goBack);

    expect(history.location.pathname).toEqual("/albums");
  });
});
