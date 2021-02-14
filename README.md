# node-env-parser

Utility functions to parse Node.js-like environment variables to type-checked values.

```ts
process.env.ENABLE_ANALYTICS = "true";
process.env.VERSION = "1.8";

const env: NodeJS.ProcessEnv = process.env;
const parser = new EnvParser(env);

const BASE_URL: string = parser.parseString("BASE_URL", {
  default: "http://localhost",
});

const ENABLE_ANALYTICS: boolean = parser.parseBoolean("ENABLE_ANALYTICS", {
  default: false,
});

const VERSION: number = parser.parseNumber("VERSION", {
  default: 1.0,
  parser: (value) => parseFloat(value),
});

// {"BASE_URL":"http://localhost","ENABLE_ANALYTICS":true,"VERSION":1.8}
console.log(JSON.stringify({ BASE_URL, ENABLE_ANALYTICS, VERSION }));
```

## Error handling

If an environment variable is defined, then it must match the type of the used parsing function. Otherwise, it throws an exception.

```ts
process.env.ENABLE_ANALYTICS = "No Thanks!";

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

#### Launch build targetting CommonJS

```
npm run build:cjs
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
npm run serve:node
```

#### Start an example web app (requires ES2015 build)

```
npm run serve:browser
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
