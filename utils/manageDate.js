import { sortByDate } from "./sortItems";

export const months = [
  { index: 1, fullName: "January", shortName: "JAN" },
  { index: 2, fullName: "February", shortName: "FEB" },
  { index: 3, fullName: "March", shortName: "MAR" },
  { index: 4, fullName: "April", shortName: "APR" },
  { index: 5, fullName: "May", shortName: "MAY" },
  { index: 6, fullName: "June", shortName: "JUN" },
  { index: 7, fullName: "July", shortName: "JUL" },
  { index: 8, fullName: "August", shortName: "AUG" },
  { index: 9, fullName: "September", shortName: "SEP" },
  { index: 10, fullName: "October", shortName: "OCT" },
  { index: 11, fullName: "November", shortName: "NOV" },
  { index: 12, fullName: "December", shortName: "DEC" },
];

export function formatDate(inputDate) {
  const month = inputDate.toLocaleString("default", { month: "long" });
  const year = inputDate.getFullYear();
  return {
    date: inputDate.toISOString(),
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

export function timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
}

export function getCurrentWeek(date) {
  const result = [];
  const currentDate = new Date(date);
  const dayOfWeek = currentDate.getDay();

  const startDate = new Date(currentDate);
  startDate.setDate(
    currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
  );

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startDate);
    currentDay.setDate(startDate.getDate() + i);
    currentDay.setHours(23, 59, 0, 0);
    result.push({
      dayName: currentDay.toDateString({ weekday: "short" }).slice(0, 3),
      dayNumber: currentDay.getDate().toString().padStart(2, "0"),
      dateString: currentDay.toISOString().split("T")[0],
      date: currentDay.toISOString(),
      index: i,
    });
  }

  return result;
}

export function getNextDays(date, range) {
  const result = [];

  for (let i = 0; i < range; i++) {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + i);
    result.push(nextDate.toISOString().split("T")[0]);
  }

  return result;
}

export function getYTDMonths(year) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let monthsArray = [];

  if (year === currentYear) {
    if (currentMonth === 0) {
      monthsArray.push({
        index: 0,
        fullName: "December",
        shortName: "DEC",
        year: currentYear - 1,
      });
    }

    for (let i = 0; i <= currentMonth; i++) {
      monthsArray.push({
        ...months[i],
        year: year,
      });
    }
  } else {
    for (let i = 0; i <= 11; i++) {
      monthsArray.push({
        ...months[i],
        year: year,
      });
    }
  }

  return monthsArray;
}

export function getMonthNumber(monthName) {
  return months.find((obj) => obj.fullName === monthName).index;
}

export function isPreviousMonth(targetMonth, targetYear) {
  const currentDate = new Date();

  const isPrevious =
    targetYear < currentDate.getFullYear() ||
    (targetYear === currentDate.getFullYear() &&
      targetMonth < currentDate.getMonth() + 1);

  return isPrevious;
}

export function sortDatesDescending(items) {
  return items.sort(function (a, b) {
    if (b.year !== a.year) {
      return b.year - a.year;
    }
    return b.month - a.month;
  });
}

export function getPreviousWeeks(date) {
  const weeks = [];
  const currentDate = new Date();

  if (currentDate < new Date(date)) {
    const mondays = getMondaysBetween(new Date(date));
    for (const m in mondays) {
      weeks.push(getCurrentWeek(new Date(mondays[m])));
    }
  } else {
    weeks.push(getCurrentWeek(new Date(date)));
  }

  return weeks;
}

function getMondaysBetween(startDate) {
  const currentDate = new Date();
  const mondays = [];

  // Set the start date to the next Monday if it's not already a Monday
  startDate.setDate(startDate.getDate() + ((1 - startDate.getDay() + 7) % 7));

  // Loop through each week between the start date and the current date
  while (startDate > currentDate) {
    const copyDate = new Date(startDate);
    mondays.push(copyDate);
    startDate.setDate(startDate.getDate() - 7); // Move to the previous Monday
  }

  mondays.push(currentDate);

  return mondays.reverse();
}
