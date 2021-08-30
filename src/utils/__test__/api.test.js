import { fetchData } from "../api";

import photos from "../../test/fixtures/photos";

describe("api:", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("fetchData responds as expected", async () => {
    fetch.mockResponseOnce(JSON.stringify(photos), { status: 200 });

    const responseData = await fetchData();

    expect(responseData.data.length).toBe(20);
  });

  it("fetchData handles failure as expected", async () => {
    fetch.mockReject(new Error("Message"));

    const responseData = await fetchData();

    expect(responseData.error).toMatch(/Error: Message/i);
  });
});
