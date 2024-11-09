const formatMonthYear = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${year}-${month}`;
};

export { formatMonthYear };
