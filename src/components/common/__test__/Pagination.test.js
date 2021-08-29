import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "../../../components/common/Pagination";

it("Should show default output", () => {
  render(<Pagination />);

  expect(screen.getByText(/1 of 1/i));
  expect(screen.getByText("←"));
  expect(screen.getByText("→"));
});

it("Should show provided output", () => {
  render(<Pagination page={5} total={10} previousPage="Previous" nextPage="Next" />);

  expect(screen.getByText(/5 of 10/i));
  expect(screen.getByText("Previous"));
  expect(screen.getByText("Next"));
});

it("Should change page forward", () => {
  let nextPage;
  render(
    <Pagination
      page={1}
      total={10}
      previousPage="Previous"
      nextPage="Next"
      changePage={(page) => (nextPage = page)}
    />
  );

  userEvent.click(screen.getByRole("button", { name: /Next/i }));

  expect(nextPage).toBe(2);
});

it("Should change page backwards", () => {
  let nextPage;
  render(
    <Pagination
      page={2}
      total={10}
      previousPage="Previous"
      nextPage="Next"
      changePage={(page) => (nextPage = page)}
    />
  );

  userEvent.click(screen.getByRole("button", { name: /Prev/i }));

  expect(nextPage).toBe(1);
});

it("Should not allow page changes outside of bounds", () => {
  render(<Pagination page={1} total={1} previousPage="Previous" nextPage="Next" />);

  expect(screen.getByRole("button", { name: /Prev/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /Next/i })).toBeDisabled();
});

// should change to last page

// should change to first page
