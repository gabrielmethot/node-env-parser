# node-env-parser

Utility functions to parse Node.js environment variables to type checked values

```ts
process.env["BASE_URL"] = undefined;
process.env["ENABLE_ANALYTICS"] = "No thanks!";
process.env["VERSION"] = "2";

export class Config {
  public baseUrl: string;
  public enableAnalytics: boolean;
  public version: number;

  constructor() {
    const parser = new EnvParser(process.env);

    // Uses default value
    this.baseUrl = parser.parseString("BASE_URL", {
      default: "http://localhost",
    });

    // Throws an exception
    this.enableAnalytics = parser.parseBoolean("ENABLE_ANALYTICS");

    this.version = parser.parseNumber("VERSION", {
      default: 1.8,
      parser: (value) => parseFloat(value as string),
    });
  }
}

// Error: Expected ENABLE_ANALYTICS environment variable to be one of ["true", "false"] but received "No thanks!"
new Config();
```
