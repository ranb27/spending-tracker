const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${year}-${month}-${day}`;
};

const formatMonthYear = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${year}-${month}`;
};

const formatYear = (date: Date): string => {
  const year = date.getFullYear().toString();
  return year;
};

export { formatMonthYear, formatYear, formatDate };
