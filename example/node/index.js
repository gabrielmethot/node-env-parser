const { EnvParser } = require("../../build/index");

process.env.ENABLE_ANALYTICS = "true";
process.env.VERSION = "1.8";

const parser = new EnvParser(process.env);

const BASE_URL = parser.parseString("BASE_URL", {
  default: "http://localhost",
});

const ENABLE_ANALYTICS = parser.parseBoolean("ENABLE_ANALYTICS", {
  default: false,
});

const VERSION = parser.parseNumber("VERSION", {
  default: 1.0,
  parser: (value) => parseFloat(value),
});

console.log(JSON.stringify({ BASE_URL, ENABLE_ANALYTICS, VERSION }));
