import { getCurrentWeek } from "./manageDate";

export async function calculateDailyInOut(categories, date) {
  const real = { in: 0, out: 0 };

  for (c of categories) {
    if (c.id !== 0) {
      if (c.income) {
        real.in += c.expenses.reduce(
          (total, e) =>
            e.date === date.toDateString() ? total + e.total : total,
          0
        );
      } else {
        real.out += c.expenses.reduce(
          (total, e) =>
            e.date === date.toDateString() ? total + e.total : total,
          0
        );
      }
    }
  }

  return real;
}

export async function calculateWeeklyInOut(categories, date) {
  const currentWeek = getCurrentWeek(date.toISOString());
  const real = { in: 0, out: 0 };

  for (d of currentWeek) {
    const dayExpenses = calculateDailyInOut(categories, new Date(d.date));
    real.in += (await dayExpenses).in;
    real.out += (await dayExpenses).out;
  }

  return real;
}

export async function calculateMonthlyInOut(categories) {
  const real = { in: 0, out: 0 };
  const forecast = { in: 0, out: 0 };

  for (c of categories) {
    if (c.id !== 0) {
      if (c.income) {
        real.in += c.expenses.reduce((total, e) => total + e.total, 0);
        forecast.in -= c.forecast;
      } else {
        real.out += c.expenses.reduce((total, e) => total + e.total, 0);
        forecast.out += c.forecast;
      }
    }
  }

  return { real, forecast };
}

export async function calculateYearlyInOut(categories) {
  const real = { in: 0, out: 0 };
  const forecast = { in: 0, out: 0 };

  for (c of categories) {
    const total = await calculateMonthlyInOut(c.categories);

    real.in += total.real.in;
    real.out += total.real.out;
    forecast.in += total.forecast.in;
    forecast.out += total.forecast.out;
  }

  return { real, forecast };
}

export async function calculateTotalLists(categories) {
  let real = 0;
  let bought = 0;
  let items = 0;
  let itemsBought = 0;

  for (c of categories) {
    if (c.id !== 0) {
      real += c.expenses.reduce((total, e) => total + e.total, 0);
      bought += c.expenses.reduce((total, e) => {
        return e.dateBought ? total + e.total : total;
      }, 0);

      items += c.expenses.length;

      for (e of c.expenses) {
        itemsBought += e.dateBought ? 1 : 0;
      }
    }
  }

  return { real, bought, items, itemsBought };
}
