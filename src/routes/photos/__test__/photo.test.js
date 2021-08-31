import * as React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import photo from "../../../test/fixtures/photo";

import PhotoPage from "../photo";

const WrappedPhotoPage = ({ history = null, ...props }) => {
  const defaultHistory = createMemoryHistory();

  return (
    <Router history={history || defaultHistory}>
      <PhotoPage {...props} />
    </Router>
  );
};

describe("Photo page:", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Should show loader initially, then display the photo", async () => {
    fetch.mockResponseOnce(JSON.stringify(photo));
    render(<WrappedPhotoPage />);

    const loading = await screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();

    const photoItem = await screen.findByRole("img");
    expect(photoItem).toBeInTheDocument();
  });

  it("Should navigate back to /photos after clicking on a back button", async () => {
    const history = createMemoryHistory({ initialEntries: ["/photos", "/photos/1"] });

    fetch.mockResponseOnce(JSON.stringify(photo));
    render(<WrappedPhotoPage history={history} />);

    const photoItem = await screen.findByRole("img");
    expect(photoItem).toBeInTheDocument();

    const goBack = screen.getByText(/Back/i);
    userEvent.click(goBack);

    expect(history.location.pathname).toEqual("/photos");
  });
});
