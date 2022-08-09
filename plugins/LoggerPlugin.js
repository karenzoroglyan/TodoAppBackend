const debug = require("debug")("application");

const LoggerPlugin = {
  name: "myLoggerPlugin",
  version: "1.0.0",
  register: async function (server, options) {
    server.ext("onPreResponse", function (request, h) {
      let responeTimeBefore = new Date().getTime();
      let responeTimeAfter = new Date().getTime();
      let responseTime = responeTimeAfter - responeTimeBefore;

      debug("Request method: %s", request.method);
      debug("Request path: %s", request.path);
      debug("Request code: %s", request.response.statusCode);
      debug("Response time: %d", responseTime);
      debug("Request params: %O", request.params);
      debug("Request body: %O", request.payload);

      return h.continue;
    });
  },
};

module.exports = LoggerPlugin;
