export function sortByName(item) {
  return item.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );
}

export function sortById() {}

export function sortByStock(item) {
  return item.sort((a, b) => b.stock - a.stock);
}

export function sortByUsage(item) {
  return item.sort((a, b) => b.used - a.used);
}

export function sortByDate(item) {
  return item.sort(function (a, b) {
    return Date.parse(a) > Date.parse(b);
  });
}

export function sortByBought(item) {
  return item.sort((a, b) => {
    // If a is bought and b is not, a should come after b
    if (a.bought && !b.bought) {
      return 1;
    }
    // If b is bought and a is not, a should come before b
    else if (!a.bought && b.bought) {
      return -1;
    }
    // If both have the same value of 'bought', no change in order
    else {
      return 0;
    }
  });
}
