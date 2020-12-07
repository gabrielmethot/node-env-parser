import { SupportedPrimitive } from "./models";

export const isMissing = (propertyName: string, expectedType: SupportedPrimitive): string => {
  return `Expected ${propertyName} environment variable to be of type ${typeof expectedType} but received type ${undefined}. Did you forget to configure a default value?`;
};

export const shouldBeString = (propertyName: string, receivedType: unknown): string => {
  return `Expected ${propertyName} environment variable to be of type string but received type ${typeof receivedType}`;
};

export const shouldBeNumber = (propertyName: string, receivedValue: unknown): string => {
  return `Expected ${propertyName} environment variable to be of type number but received "${receivedValue}"`;
};

export const shouldBeBoolean = (propertyName: string, receivedValue: unknown): string => {
  return `Expected ${propertyName} environment variable to be of type boolean but received "${receivedValue}"`;
};

const ErrorMessages = {
  isMissing,
  shouldBeString,
  shouldBeNumber,
  shouldBeBoolean,
};

export default ErrorMessages;
