const initServer = require("./server");

test("response should return array", async () => {
  const server = initServer();

  const response = await server.inject({
    method: "GET",
    url: "/todos",
  });

  const result = response.result;

  

  expect(Array.isArray(result)).toBe(true);

  // response has status code 200
  // response has todos as array
});
