import * as ErrorMessage from "./error-message";

export type EnvironmentVariable = string | undefined;

export interface Environment {
  [index: string]: EnvironmentVariable;
}

export type SupportedType = string | number | boolean;

export interface SharedOptions<T extends SupportedType> {
  default?: T;
}

export type StringOptions = SharedOptions<string>;

export interface NumberOptions extends SharedOptions<number> {
  parser?: NumberParser;
}

export type BooleanOptions = SharedOptions<boolean>;

export type NumberParser = (value: Exclude<EnvironmentVariable, undefined>) => number;

export const intParser: NumberParser = (value) => {
  return parseInt(value, 10);
};

export class EnvParser {
  private env: Environment;

  /**
   * @param env Node.js-like environment object
   * @example
   * const parser: EnvParser = new EnvParser(process.env);
   */
  constructor(env: Environment) {
    this.env = env;
  }

  /**
   * Parse an environment variable to a string
   * @param name Environment variable's name
   * @param options Parsing options
   * @example
   * const parser: EnvParser = new EnvParser(process.env);
   * const hostname: string = parser.parseString("HOSTNAME", { default: "http://localhost" });
   */
  public parseString(name: string, options?: StringOptions): string {
    const value = this.env?.[name];

    if (value === undefined) {
      if (options?.default === undefined) {
        throw new Error(ErrorMessage.notDefined(name));
      }

      return options.default;
    }

    return value;
  }

  /**
   * Parse an environment variable to a number
   * @param name Environment variable's name
   * @param options Parsing options
   * @example
   * const parser: EnvParser = new EnvParser(process.env);
   * const version: number = parser.parseNumber("VERSION", { default: 1.0, parser: (value: string) => parseFloat(value) });
   */
  public parseNumber(name: string, options?: NumberOptions): number {
    const value = this.env?.[name];

    if (value === undefined) {
      if (options?.default === undefined) {
        throw new Error(ErrorMessage.notDefined(name));
      }

      return options.default;
    }

    const usedParser = options?.parser ?? intParser;
    const parsedValue = usedParser(value);

    if (isNaN(parsedValue)) {
      throw new Error(ErrorMessage.conversionFailure(name, "number"));
    }

    return parsedValue;
  }

  /**
   * Parse an environment variable to a boolean
   * @param name Environment variable's name
   * @param options Parsing options
   * @example
   * const parser: EnvParser = new EnvParser(process.env);
   * const enableAnalytics: boolean = parser.parseBoolean("ENABLE_ANALYTICS", { default: false });
   */
  public parseBoolean(name: string, options?: BooleanOptions): boolean {
    const value = this.env?.[name];

    if (value === undefined) {
      if (options?.default === undefined) {
        throw new Error(ErrorMessage.notDefined(name));
      }

      return options.default;
    }

    if (value === "true") {
      return true;
    }

    if (value === "false") {
      return false;
    }

    throw new Error(ErrorMessage.conversionFailure(name, "boolean"));
  }
}
