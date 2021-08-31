import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import albums from "../../../test/fixtures/albums";

import AlbumList from "../AlbumList";

describe("AlbumList:", () => {
  it("Should render provided albums", () => {
    render(
      <Router>
        <AlbumList albums={albums} />
      </Router>
    );

    expect(screen.getAllByRole("link")).toHaveLength(5);
  });

  it("Should render error message", () => {
    render(
      <Router>
        <AlbumList albums={albums} error="Error message!" />
      </Router>
    );

    const error = screen.getByText(/Error message!/i);

    expect(error).toBeInTheDocument();
  });

  it('Should render default "empty" state text', () => {
    render(
      <Router>
        <AlbumList />
      </Router>
    );

    const msg = screen.getByText(/No albums/i);

    expect(msg).toBeInTheDocument();
  });
});
