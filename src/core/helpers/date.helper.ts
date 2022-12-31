export const transformUTCDate = (currentValue: Date) => {
  const tzDate = currentValue.toLocaleString("sv-SE", {
    timeZone: "America/Lima",
  });
  const [date, time] = tzDate.split(" ");
  const formatedDate = `${date}T${time}.000Z`;
  return new Date(formatedDate);
};
