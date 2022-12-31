/**
 * Validate RGB pattern in fields
 * @param key: Field Key
 * @param value: Field Value
 * @returns boolean
 */
export const validateRGB = (key: string, value: string) => {
  const regex = /rgb[(\]]([A-Za-z])\w+[)\]]/g;
  const hasRGBPattern = regex.test(value);
  return hasRGBPattern;
};
