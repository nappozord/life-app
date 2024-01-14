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

function timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
}

export function getCurrentWeek(date) {
  const result = [];
  const currentDate = date;
  const dayOfWeek = currentDate.getDay();

  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startDate);
    currentDay.setDate(startDate.getDate() + i);
    result.push({
      dayName: currentDay.toDateString({weekday: 'short'}).slice(0, 3),
      dayNumber: currentDay.getDate().toString().padStart(2, '0'),
      date: currentDay.toISOString().split('T')[0],
      index: i,
    });
  }

  return result;
}

export function getNextDays(date, range){
  const result = [];

  for(let i = 0; i < range; i++){
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + i);
    result.push(nextDate.toISOString().split("T")[0]);
  }

  return result;
}
