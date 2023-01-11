export const slugify = (text: string) => {
  return text.toLowerCase().split(" ").join("-");
};
