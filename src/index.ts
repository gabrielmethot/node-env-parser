import { Schema, ProcessEnvironment, SupportedPrimitive, Config, NumberProperty } from "./models";
import TypeChecker from "./type-checking";
import TypeCaster from "./type-casting";
import ErrorMessage from "./error-messages";

export const createSchema = <T extends Schema>(schema: T): T => schema;

export const parseEnv = <T extends Schema>(processEnv: ProcessEnvironment, schema: T): Config<T> => {
  const schemaProperties = Object.entries(schema);
  const config: { [index: string]: SupportedPrimitive } = {};

  for (const schemaProperty of schemaProperties) {
    const [name, value] = schemaProperty;
    const valueInProcessEnv = processEnv[name];

    if (valueInProcessEnv === undefined) {
      if (value.default !== undefined) {
        config[name] = value.default;
        continue;
      }

      throw new Error(ErrorMessage.isMissing(name, value.type));
    }

    if (TypeChecker.isString(value.type)) {
      if (TypeChecker.isString(valueInProcessEnv)) {
        config[name] = valueInProcessEnv;
        continue;
      }

      throw new Error(ErrorMessage.shouldBeString(name, valueInProcessEnv));
    }

    if (TypeChecker.isNumber(value.type)) {
      if (TypeChecker.isSerializedNumber(valueInProcessEnv)) {
        const parser = (value as NumberProperty)?.parser ?? TypeCaster.toNumber;
        config[name] = parser(valueInProcessEnv);
        continue;
      }

      throw new Error(ErrorMessage.shouldBeNumber(name, valueInProcessEnv));
    }

    if (TypeChecker.isBoolean(value.type)) {
      if (TypeChecker.isSerializedBoolean(valueInProcessEnv)) {
        config[name] = TypeCaster.stringToBoolean(valueInProcessEnv);
        continue;
      }

      throw new Error(ErrorMessage.shouldBeBoolean(name, valueInProcessEnv));
    }
  }

  return config as Config<T>;
};

const nodeEnvParser = {
  createSchema,
  parseEnv,
};

export default nodeEnvParser;
