/**
 * Validate RGB pattern in fields
 * @param key: Field Key
 * @param value: Field Value
 * @returns boolean
 */
export const validateRGB = (key: string, value: string) => {
  const regex = /^(rgb[(\]]([0-9]*\S,[0-9]*\S,[0-9]*\S)[)\]])$/g;
  const hasRGBPattern = regex.test(value);
  return hasRGBPattern;
};
