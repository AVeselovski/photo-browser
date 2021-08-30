import * as React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import albums from "../../test/fixtures/albums";

import App from "../App";

const WrappedApp = ({ history = null, ...props }) => {
  const defaultHistory = createMemoryHistory();

  return (
    <Router history={history || defaultHistory}>
      <App {...props} />
    </Router>
  );
};

// Integration tests
describe("App:", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Should navigate to albums page, fetch and display albums", async () => {
    fetch.mockResponseOnce(JSON.stringify(albums));
    render(<WrappedApp />);

    const headerNav = screen.getByTestId("header-nav");
    const link = within(headerNav).getByRole("link", { name: /Albums/i });

    userEvent.click(link);

    const page = await screen.findByTestId("albums-page");
    expect(page).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/albums?_page=1&_limit=10",
      expect.anything()
    );

    const albumList = screen.getByTestId("card-list");
    const albumItems = within(albumList).getAllByRole("link");
    expect(albumItems).toHaveLength(5);
  });
});
