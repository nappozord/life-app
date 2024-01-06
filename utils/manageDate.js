export function formatDate(inputDate) {
  const month = inputDate.toLocaleString("default", { month: "long" });
  const year = inputDate.getFullYear();
  return {
    date: inputDate,
    month: inputDate.getMonth() + 1,
    year: year,
    title: month + ", " + year,
  };
}

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export function getRemainingDaysInMonth(date) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  if (date.year === year) {
    const totalDaysInMonth = getDaysInMonth(year, month);
    const remainingDays = totalDaysInMonth - today.getDate() + 1;

    return remainingDays;
  } else return 1;
}
