import * as React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import albums from "../../../test/fixtures/albums";

import AlbumsPage from "../index";

const WrappedAlbumsPage = ({ history = null, ...props }) => {
  const defaultHistory = createMemoryHistory();

  return (
    <Router history={history || defaultHistory}>
      <AlbumsPage {...props} />
    </Router>
  );
};

describe("Albums page:", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Should show loader initially, then display albums", async () => {
    fetch.mockResponseOnce(JSON.stringify(albums));
    render(<WrappedAlbumsPage />);

    const loading = await screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();

    const photoGrid = await screen.findByTestId("card-list");
    expect(photoGrid).toBeInTheDocument();
  });

  it("Should navigate to /albums/:id after clicking on an album", async () => {
    const history = createMemoryHistory();

    fetch.mockResponseOnce(JSON.stringify(albums));
    render(<WrappedAlbumsPage history={history} />);

    const cardList = await screen.findByTestId("card-list");
    expect(cardList).toBeInTheDocument();

    const albumItems = within(cardList).getAllByRole("link");
    userEvent.click(albumItems[0]);

    expect(history.location.pathname).toEqual("/albums/1");
  });
});
