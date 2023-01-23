export const getEnumKeys = (enumObject: any) => {
  const enumKeys: string[] = [];
  for (const enumKey in enumObject) {
    enumKeys.push(enumObject[enumKey]);
  }

  return enumKeys;
};
