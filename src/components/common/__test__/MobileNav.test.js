import * as React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UiProvider } from "../../../context/UiContext";
import MobileNav from "../MobileNav";

const navLinks = [
  { name: "Test-1", path: "/test-1" },
  { name: "Test-2", path: "/test-2" }
];

const WrappedMobileNav = ({ history = null, ...props }) => {
  const defaultHistory = createMemoryHistory();

  return (
    <Router history={history || defaultHistory}>
      <UiProvider>
        <MobileNav {...props} />
      </UiProvider>
    </Router>
  );
};

describe("MobileNav", () => {
  it("Should not have <ul> element without nav links", () => {
    render(<WrappedMobileNav />);

    const list = screen.queryByRole("list");
    expect(list).not.toBeInTheDocument();
  });

  it("Should render provided nav links", () => {
    render(<WrappedMobileNav links={navLinks} />);

    const links = screen.getAllByRole("listitem");
    expect(links).toHaveLength(2);
    expect(links[0]).toContainElement(screen.getByText(/Test-1/i));
  });

  it("Should navigate via nav link and display active class", () => {
    const history = createMemoryHistory();
    render(<WrappedMobileNav history={history} links={navLinks} />);

    const navLink = screen.getByRole("link", { name: /Test-2/i });
    userEvent.click(navLink);

    expect(history.location.pathname).toEqual("/test-2");
    expect(navLink).toHaveClass("active");
  });

  // change navOpen state (?)
});
