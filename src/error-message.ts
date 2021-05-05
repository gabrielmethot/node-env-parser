export function notDefined(name: string): string {
  return `${name} environment variable is not defined`;
}

export function conversionFailure(name: string, targetType: string): string {
  return `${name} environment variable cannot be converted to a ${targetType}`;
}
