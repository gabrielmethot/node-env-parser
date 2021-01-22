import { EnvParser, Environment } from "../index";

describe(`${EnvParser.name}.${EnvParser.prototype.parseString.name}()`, () => {
  it("throws an exception when environment variable is undefined and option's default value is *not* provided", () => {
    const env: Environment = {};
    const envParser = new EnvParser(env);

    expect(() => envParser.parseString("NODE_ENV")).toThrowError(
      "NODE_ENV environment variable is undefined and *no* default value was provided"
    );
  });

  it("returns options's default value when environment variable is undefined", () => {
    const env: Environment = {};
    const envParser = new EnvParser(env);

    expect(envParser.parseString("NODE_ENV", { default: "production" })).toBe("production");
  });

  it("returns parsed value of environment variable", () => {
    const env: Environment = { NODE_ENV: "production" };
    const envParser = new EnvParser(env);

    expect(envParser.parseString("NODE_ENV")).toBe("production");
  });
});

describe(`${EnvParser.name}.${EnvParser.prototype.parseNumber.name}()`, () => {
  it("throws an exception when environment variable is undefined and options's default value is *not* provided", () => {
    const env: Environment = {};
    const envParser = new EnvParser(env);

    expect(() => envParser.parseNumber("PORT")).toThrowError(
      "PORT environment variable is undefined and *no* default value was provided"
    );
  });

  it("returns options's default value when environment variable is undefined", () => {
    const env: Environment = {};
    const envParser = new EnvParser(env);

    expect(envParser.parseNumber("PORT", { default: 3000 })).toBe(3000);
  });

  it("uses options's parser", () => {
    const env: Environment = { PORT: "3000" };
    const envParser = new EnvParser(env);
    const parser = jest.fn().mockImplementation((value) => parseInt(value, 10));

    envParser.parseNumber("PORT", { parser });

    expect(parser).toHaveBeenCalledWith(env["PORT"]);
  });

  it("throws an exception when parsing of environment variable fails", () => {
    const env: Environment = { NOT_A_NUMBER: "Hello World!" };
    const envParser = new EnvParser(env);

    expect(() => envParser.parseNumber("NOT_A_NUMBER")).toThrowError(
      "Parsing of NOT_A_NUMBER environment variable as a number failed"
    );
  });

  it("returns parsed value of environment variable", () => {
    const env: Environment = { PORT: "3000" };
    const envParser = new EnvParser(env);

    expect(envParser.parseNumber("PORT")).toBe(3000);
  });
});

describe(`${EnvParser.name}.${EnvParser.prototype.parseBoolean.name}()`, () => {
  it("throws an exception when environment variable is undefined and options's default value is *not* provided", () => {
    const env: Environment = {};
    const envParser = new EnvParser(env);

    expect(() => envParser.parseBoolean("TOGGLE_FEATURE")).toThrowError(
      "TOGGLE_FEATURE environment variable is undefined and *no* default value was provided"
    );
  });

  it("returns options's default value when environment variable is undefined", () => {
    const env: Environment = {};
    const envParser = new EnvParser(env);

    expect(envParser.parseBoolean("TOGGLE_FEATURE", { default: true })).toBe(true);
  });

  it("throws an exception when parsing of environment variable fails", () => {
    const env: Environment = { TOGGLE_FEATURE: "Hello World!" };
    const envParser = new EnvParser(env);

    expect(() => envParser.parseBoolean("TOGGLE_FEATURE")).toThrowError(
      `Expected TOGGLE_FEATURE environment variable to be one of ["true", "false"] but received "Hello World!"`
    );
  });

  it(`returns true value when environment variable is "true"`, () => {
    const env: Environment = { TOGGLE_FEATURE: "true" };
    const envParser = new EnvParser(env);

    expect(envParser.parseBoolean("TOGGLE_FEATURE")).toBe(true);
  });

  it(`returns false value when environment variable is "false"`, () => {
    const env: Environment = { TOGGLE_FEATURE: "false" };
    const envParser = new EnvParser(env);

    expect(envParser.parseBoolean("TOGGLE_FEATURE")).toBe(false);
  });
});
