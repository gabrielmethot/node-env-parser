import { toNumber } from "./type-casting";

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isNumber = (value: unknown): value is number => {
  return Number.isNaN(toNumber(value)) === false;
};

export const isSerializedNumber = isNumber;

export const isBoolean = (value: unknown): value is boolean => {
  return value === true || value === false;
};

export const isSerializedBoolean = (value: unknown): value is "true" | "false" => {
  return value === "true" || value === "false";
};

const TypeChecking = {
  isString,
  isNumber,
  isSerializedNumber,
  isBoolean,
  isSerializedBoolean,
};

export default TypeChecking;
