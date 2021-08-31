import * as React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import users from "../../../test/fixtures/users";

import UsersPage from "../index";

const WrappedUsersPage = ({ history = null, ...props }) => {
  const defaultHistory = createMemoryHistory();

  return (
    <Router history={history || defaultHistory}>
      <UsersPage {...props} />
    </Router>
  );
};

describe("Users page:", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Should show loader initially, then display users", async () => {
    fetch.mockResponseOnce(JSON.stringify(users));
    render(<WrappedUsersPage />);

    const loading = await screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();

    const cardList = await screen.findByTestId("user-card-list");
    expect(cardList).toBeInTheDocument();
  });

  it("Should navigate to /users/:id after clicking on a user", async () => {
    const history = createMemoryHistory();

    fetch.mockResponseOnce(JSON.stringify(users));
    render(<WrappedUsersPage history={history} />);

    const cardList = await screen.findByTestId("user-card-list");
    expect(cardList).toBeInTheDocument();

    const userItems = within(cardList).getAllByRole("link");
    userEvent.click(userItems[0]);

    expect(history.location.pathname).toEqual("/users/1");
  });
});
