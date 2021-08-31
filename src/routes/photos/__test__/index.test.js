import * as React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import photos from "../../../test/fixtures/photos";

import PhotosPage from "../index";

const WrappedPhotosPage = ({ history = null, ...props }) => {
  const defaultHistory = createMemoryHistory();

  return (
    <Router history={history || defaultHistory}>
      <PhotosPage {...props} />
    </Router>
  );
};

describe("Photos page:", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Should show loader initially, then display photos", async () => {
    fetch.mockResponseOnce(JSON.stringify(photos));
    render(<WrappedPhotosPage />);

    const loading = await screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();

    const photoGrid = await screen.findByTestId("photo-grid");
    expect(photoGrid).toBeInTheDocument();
  });

  it("Should navigate to /photos/:id after clicking on a photo", async () => {
    const history = createMemoryHistory();

    fetch.mockResponseOnce(JSON.stringify(photos));
    render(<WrappedPhotosPage history={history} />);

    const photoGrid = await screen.findByTestId("photo-grid");
    expect(photoGrid).toBeInTheDocument();

    const photoItems = within(photoGrid).getAllByRole("link");
    userEvent.click(photoItems[0]);

    expect(history.location.pathname).toEqual("/photos/1");
  });
});
