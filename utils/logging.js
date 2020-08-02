const winston = require("winston");
require("winston-papertrail").Papertrail;

module.exports = function (component) {
  const winstonConsole = new winston.transports.Console({
    formatter: function (opts) {
      const { level, message } = opts;

      return `(${component}) [${level.toUpperCase()}] ${message}`;
    },
  });

  const winstonLogger = new winston.Logger({
    level: "debug",
    transports: [winstonConsole],
  });

  return winstonLogger;
};
