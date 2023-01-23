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

/**
 * Validate Slug pattern in fields
 * @param text: text for testing
 * @returns boolean
 */
export const isSlug = (text: string) => {
  const reg = new RegExp('^([a-z]|[0-9]|(-))+$', 'i');
  const isValid = reg.test(text);
  return isValid;
};
