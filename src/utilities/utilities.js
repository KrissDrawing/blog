export const trimString = (title, amount) => {
  return title.substring(0, amount) + (title.length > amount ? "..." : "");
};
