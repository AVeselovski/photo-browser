import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import photos from "../../../test/fixtures/photos";

import PhotoGrid from "../PhotoGrid";

it("Should render provided photos", () => {
  render(
    <Router>
      <PhotoGrid photos={photos} />
    </Router>
  );

  expect(screen.getAllByRole("img")).toHaveLength(20);
});

it("Should render error message", () => {
  render(
    <Router>
      <PhotoGrid photos={photos} error="Error message!" />
    </Router>
  );

  const error = screen.getByText(/Error message!/i);

  expect(error).toBeInTheDocument();
});

it('Should render default "empty" state text', () => {
  render(
    <Router>
      <PhotoGrid />
    </Router>
  );

  const msg = screen.getByText(/No photos/i);

  expect(msg).toBeInTheDocument();
});
