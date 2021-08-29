import * as React from "react";
import { render, screen } from "@testing-library/react";

import Loading from "../Loading";

it("Should render", () => {
  render(<Loading />);
});
