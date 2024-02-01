export async function calculateMonthlyInOut(categories) {
  const real = { in: 0, out: 0 };
  const forecast = { in: 0, out: 0 };

  for(c of categories) {
    if (c.id !== 0) {
      if (c.income) {
        real.in += -c.real;
        forecast.in += -c.forecast;
      } else {
        real.out += c.real;
        forecast.out += c.forecast;
      }
    }
  };

  return { real, forecast };
}

export async function calculateYearlyInOut(categories) {
  const real = { in: 0, out: 0 };
  const forecast = { in: 0, out: 0 };

  for(c of categories) {
    const total = await calculateMonthlyInOut(c.categories);

    real.in += total.real.in;
    real.out += total.real.out
    forecast.in += total.forecast.in;
    forecast.out += total.forecast.out
  };

  return { real, forecast };
}