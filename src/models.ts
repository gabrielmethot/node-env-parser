export interface ProcessEnvironment {
  [index: string]: unknown;
}

export type SupportedPrimitive = string | boolean | number;

export interface StringProperty {
  type: "string";
  default?: string;
}

export interface NumberProperty {
  type: "number";
  default?: number;
  parser?: (value: unknown, ...args: never[]) => number;
}

export interface BooleanProperty {
  type: "boolean";
  default?: boolean;
}

export type SchemaProperty = StringProperty | NumberProperty | BooleanProperty;

export interface Schema {
  [index: string]: SchemaProperty;
}

export type Config<T extends Schema> = {
  [P in keyof T]: T[P]["type"] extends "string"
    ? string
    : T[P]["type"] extends "number"
    ? number
    : T[P]["type"] extends "boolean"
    ? boolean
    : undefined;
};
