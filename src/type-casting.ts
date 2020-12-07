export const toNumber = (value: unknown): number => parseInt(value as string, 10);

export const stringToBoolean = (value: string): boolean => {
  if (value === "true") {
    return true;
  }

  return false;
};

const TypeCasting = {
  toNumber,
  stringToBoolean,
};

export default TypeCasting;
