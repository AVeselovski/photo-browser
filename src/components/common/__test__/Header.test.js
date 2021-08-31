import * as React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UiProvider } from "../../../context/UiContext";
import Header from "../Header";

const navLinks = [
  { name: "Test-1", path: "/test-1" },
  { name: "Test-2", path: "/test-2" }
];

const WrappedHeader = ({ history = null, ...props }) => {
  const defaultHistory = createMemoryHistory();

  return (
    <Router history={history || defaultHistory}>
      <UiProvider>
        <Header {...props} />
      </UiProvider>
    </Router>
  );
};

describe("Header:", () => {
  it("Should render and display default header (app title)", () => {
    render(<WrappedHeader />);

    const heading = screen.getByRole("heading", { name: /Photo/i });

    expect(heading).toBeInTheDocument();
  });

  it("Should not have <ul> element without nav links", () => {
    render(<WrappedHeader />);

    const navList = screen.queryByRole("list");

    expect(navList).not.toBeInTheDocument();
  });

  it("Should render provided nav links", () => {
    render(<WrappedHeader links={navLinks} />);

    const navListItems = screen.getAllByRole("listitem");

    expect(navListItems).toHaveLength(2);
    expect(navListItems[0]).toContainElement(screen.getByText(/Test-1/i));
  });

  it("Should navigate via nav link and display active class", () => {
    const history = createMemoryHistory();
    render(<WrappedHeader history={history} links={navLinks} />);

    const navLink = screen.getByRole("link", { name: /Test-2/i });
    userEvent.click(navLink);

    expect(history.location.pathname).toEqual("/test-2");
    expect(navLink).toHaveClass("active");
  });
});
