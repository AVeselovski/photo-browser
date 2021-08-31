import * as React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import user from "../../../test/fixtures/user";
import albums from "../../../test/fixtures/albums";

import UserPage from "../user";

const WrappedUserPage = ({ history = null, ...props }) => {
  const defaultHistory = createMemoryHistory();

  return (
    <Router history={history || defaultHistory}>
      <UserPage {...props} />
    </Router>
  );
};

describe("User page:", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Should show loader initially, then display the user", async () => {
    fetch.mockResponseOnce(JSON.stringify(user));
    fetch.mockResponseOnce(JSON.stringify(albums));
    render(<WrappedUserPage />);

    const loading = await screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();

    const userItem = await screen.findByRole("heading", { name: user.name });
    expect(userItem).toBeInTheDocument();
  });

  it("Should navigate back to /users after clicking on a back button", async () => {
    const history = createMemoryHistory({ initialEntries: ["/users", "/users/1"] });

    fetch.mockResponseOnce(JSON.stringify(user));
    fetch.mockResponseOnce(JSON.stringify(albums));
    render(<WrappedUserPage history={history} />);

    const userItem = await screen.findByRole("heading", { name: user.name });
    expect(userItem).toBeInTheDocument();

    const goBack = screen.getByText(/Back/i);
    userEvent.click(goBack);

    expect(history.location.pathname).toEqual("/users");
  });
});
