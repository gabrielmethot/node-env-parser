export interface Environment {
  [index: string]: EnvironmentVariable;
}

export type EnvironmentVariable = string | undefined;

export interface StringOptions {
  default?: string;
}

export interface NumberOptions {
  default?: number;
  parser?: (value: EnvironmentVariable) => number;
}

export interface BooleanOptions {
  default?: boolean;
}

export class EnvParser {
  private env: Environment;

  constructor(env: Environment) {
    this.env = env;
  }

  public parseString(name: string, options?: StringOptions): string {
    const value = this.env?.[name];

    if (value === undefined) {
      if (options?.default === undefined) {
        throw new Error(`${name} environment variable is undefined and *no* default value was provided`);
      }

      return options.default;
    }

    return value;
  }

  public parseNumber(name: string, options?: NumberOptions): number {
    const value = this.env?.[name];

    if (value === undefined) {
      if (options?.default === undefined) {
        throw new Error(`${name} environment variable is undefined and *no* default value was provided`);
      }

      return options.default;
    }

    const usedParser = options?.parser ?? this.numberParser;
    const parsedValue = usedParser(value);

    if (isNaN(parsedValue)) {
      throw new Error(`Parsing of ${name} environment variable as a number failed`);
    }

    return parsedValue;
  }

  public parseBoolean(name: string, options?: BooleanOptions): boolean {
    const value = this.env?.[name];

    if (value === undefined) {
      if (options?.default === undefined) {
        throw new Error(`${name} environment variable is undefined and *no* default value was provided`);
      }

      return options.default;
    }

    if (value === "true") {
      return true;
    }

    if (value === "false") {
      return false;
    }

    throw new Error(`Expected ${name} environment variable to be one of ["true", "false"] but received "${value}"`);
  }

  protected numberParser(value: EnvironmentVariable): number {
    return parseInt(value as string, 10);
  }
}

export default EnvParser;
