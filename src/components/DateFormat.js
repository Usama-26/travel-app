export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("default", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
