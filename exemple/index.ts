import nodeEnvParser from "../src/index";

const schema = nodeEnvParser.createSchema({
  NUKE_PROD: {
    type: "boolean",
  },
  BASE_URL: {
    type: "string",
    default: "http://localhost",
  },
  PORT: {
    type: "number",
  },
});

const env = {
  NUKE_PROD: "false",
  BASE_URL: "http://localhost",
  PORT: "3000",
};

const config = nodeEnvParser.parseEnv(env, schema);

console.log(config);
