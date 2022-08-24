const initServer = require("./server");
const LoggerPlugin = require("./plugins/LoggerPlugin");

const server = initServer();

const init = async () => {
  await server.register({
    plugin: LoggerPlugin,
  });

  await server.start();
};

init();
