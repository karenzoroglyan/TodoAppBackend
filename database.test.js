const initServer = require("./server");

test("response should return array", async () => {
  const server = initServer();

  const response = await server.inject({
    method: "GET",
    url: "/todos",
  });

  const result = response.result;

  expect(Array.isArray(result)).toBe(true);
  result.forEach((element) => {
    const hasId = element.hasOwnProperty("id");
    expect(hasId).toBe(true);
  });

  result.forEach((element) => {
    const hasTitle = element.hasOwnProperty("title");
    expect(hasTitle).toBe(true);
  });
  // response has status code 200
  // response has todos as array
});
