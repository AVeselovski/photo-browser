import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import users from "../../../test/fixtures/users";

import UserList from "../UserList";

it("Should render provided users", () => {
  render(
    <Router>
      <UserList users={users} />
    </Router>
  );

  const links = screen.getAllByRole("link");

  expect(links).toHaveLength(1);
});

it("Should render error message", () => {
  render(
    <Router>
      <UserList users={users} error="Error message!" />
    </Router>
  );

  const error = screen.getByText(/Error message!/i);

  expect(error).toBeInTheDocument();
});

it('Should render default "empty" state text', () => {
  render(
    <Router>
      <UserList />
    </Router>
  );

  const msg = screen.getByText(/No users/i);

  expect(msg).toBeInTheDocument();
});
