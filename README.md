# node-env-parser

Utility functions to parse Node.js-like environment variables to type-checked values.

```ts
process.env = {
  VERSION: "1.8",
  ENABLE_ANALYTICS: "true",
};

const parser = new EnvParser(process.env);

const HOSTNAME: string = parser.parseString("HOSTNAME", {
  default: "http://localhost",
});

const VERSION: number = parser.parseNumber("VERSION", {
  default: 1.0,
  parser: (value: string) => parseFloat(value),
});

const ENABLE_ANALYTICS: boolean = parser.parseBoolean("ENABLE_ANALYTICS", {
  default: false,
});

// {"HOSTNAME":"http://localhost","VERSION":1.8,"ENABLE_ANALYTICS":true}
console.log(JSON.stringify({ HOSTNAME, VERSION, ENABLE_ANALYTICS }));
```

## Error handling

If an environment variable is defined, then it must match the type of the used parsing function. Otherwise, it throws an exception.

```ts
process.env = {
  ENABLE_ANALYTICS: "No Thanks!",
};

const parser = new EnvParser(process.env);
parser.parseBoolean("ENABLE_ANALYTICS"); // Throws an exception
```

If an environment variable is not defined, then a default value must be provided. Otherwise, it throws an exception.

```ts
process.env = {};

const parser = new EnvParser(process.env);
parser.parseString("SOME_VALUE", { default: "Hello World!" }); // Returns "Hello World!"
parser.parseString("SOME VALUE"); // Throws an exception
```

## About this repository

### Scripts

#### Launch build targetting UMD

```
npm run build:umd
```

#### Launch build targetting ES2015

```
npm run build:esm
```

#### Launch all builds

```
npm run build
```

#### Detect and attempt to fix problematic coding patterns in source code only

```
npm run prebuild
```

#### Start an example Node.js app (requires CommonJS build)

```
npm run example:node
```

#### Start an example web app (requires ES2015 build)

```
npm run example:browser
```

#### Detect TypeScript errors (does not emit a build)

```
npm run typecheck
```

#### Detect problematic coding patterns

```
npm run lint
```

#### Detect and attempt to fix problematic coding patterns

```
npm run lint:fix
```

#### Detect inconsistent code style

```
npm run format
```

#### Detect and fix inconsistent code style

```
npm run format:fix
```

#### Run unit tests

```
npm run test
```
