const { EnvParser } = require("../../build/index");

process.env = {
  VERSION: "1.8",
  ENABLE_ANALYTICS: "true",
};

const parser = new EnvParser(process.env);

const HOSTNAME = parser.parseString("HOSTNAME", {
  default: "http://localhost",
});

const VERSION = parser.parseNumber("VERSION", {
  default: 1.0,
  parser: (value) => parseFloat(value),
});

const ENABLE_ANALYTICS = parser.parseBoolean("ENABLE_ANALYTICS", {
  default: false,
});

console.log(JSON.stringify({ HOSTNAME, VERSION, ENABLE_ANALYTICS }));
