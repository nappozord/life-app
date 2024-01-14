export const realCategories = [
  {
    title: "December, 2023",
    categories: [
      {
        id: 0,
        title: "Overall",
        real: { in: 3053, out: 2758.22 },
        forecast: { in: 2880, out: 2880 },
        icon: "chart-bar",
        index: 0,
      },
      {
        id: 1,
        title: "Earnings",
        real: -3053,
        forecast: -2880,
        icon: "cash-multiple",
        expenses: [
          { title: "Salary", total: 1563, id: 0, occurrence: 1 },
          { title: "Christmas Bonus", total: 1490, id: 2, occurrence: 1 },
        ],
        income: true,
        index: 1,
      },
      {
        id: 2,
        title: "Subscriptions",
        real: 31.96,
        forecast: 32,
        icon: "widgets",
        expenses: [
          { title: "Google Storage", total: 1.99, id: 0, occurrence: 1 },
          { title: "Spotify", total: 10.99, id: 1, occurrence: 1 },
          { title: "Netflix", total: 12.99, id: 2, occurrence: 1 },
          { title: "Glovo Prime", total: 5.99, id: 3, occurrence: 1 },
        ],
        income: false,
        index: 2,
      },
      {
        id: 3,
        title: "Bills",
        real: 144.89,
        forecast: 108,
        icon: "checkbook",
        expenses: [
          { title: "Iren", total: 107, id: 0, occurrence: 1 },
          { title: "Tim", total: 37.89, id: 1, occurrence: 1 },
        ],
        income: false,
        index: 3,
      },
      {
        id: 4,
        title: "Groceries",
        real: 101.27,
        forecast: 120,
        icon: "basket",
        expenses: [
          { title: "Ins", total: 26.29, id: 0, occurrence: 1 },
          { title: "Ins", total: 25.05, id: 1, occurrence: 2 },
          { title: "Ins", total: 28.42, id: 3, occurrence: 3 },
          { title: "Ins", total: 21.51, id: 5, occurrence: 4 },
        ],
        income: false,
        index: 4,
      },
      {
        id: 5,
        title: "Rent",
        real: 500,
        forecast: 500,
        icon: "home",
        expenses: [{ title: "Rent", total: 500, id: 0, occurrence: 1 }],
        income: false,
        index: 5,
      },
      {
        id: 6,
        title: "Week 1",
        real: 68.36,
        forecast: 70,
        icon: "dice-1",
        expenses: [
          { title: "AWS", total: 0.46, id: 0, occurrence: 1 },
          { title: "Coffee", total: 1, id: 1, occurrence: 1 },
          { title: "Pub", total: 48.5, id: 2, occurrence: 1 },
          { title: "Amazon - Phone Cover", total: 1, id: 3, occurrence: 1 },
          { title: "Sushi", total: 4.4, id: 4, occurrence: 1 },
          { title: "Postepay", total: 13, id: 5, occurrence: 1 },
        ],
        income: false,
        index: 6,
      },
      {
        id: 7,
        title: "Week 2",
        real: 58,
        forecast: 70,
        icon: "dice-2",
        expenses: [
          { title: "Lunch", total: 11.5, id: 0, occurrence: 1 },
          { title: "Piper", total: 11.5, id: 1, occurrence: 1 },
          { title: "Manhattan", total: 35, id: 2, occurrence: 1 },
        ],
        income: false,
        index: 7,
      },
      {
        id: 8,
        title: "Week 3",
        real: 27.4,
        forecast: 70,
        icon: "dice-3",
        expenses: [
          { title: "Coffee", total: 1, id: 0, occurrence: 1 },
          { title: "Sushi", total: 4.4, id: 1, occurrence: 1 },
          { title: "Spritz", total: 10, id: 2, occurrence: 1 },
          { title: "Haircut", total: 12, id: 3, occurrence: 1 },
        ],
        income: false,
        index: 8,
      },
      {
        id: 9,
        title: "Week 4",
        real: 53.4,
        forecast: 70,
        icon: "dice-4",
        expenses: [
          { title: "Bar Federica", total: 50, id: 0, occurrence: 1 },
          { title: "Coffee", total: 1, id: 1, occurrence: 1 },
          { title: "Dinner Marco", total: 2.4, id: 2, occurrence: 1 },
        ],
        income: false,
        index: 9,
      },
      {
        id: 10,
        title: "Week 5",
        real: 61.83,
        forecast: 70,
        icon: "dice-5",
        expenses: [
          { title: "Dinner Gianmaria", total: 15, id: 0, occurrence: 1 },
          { title: "Amazon - Outlet", total: 19.45, id: 1, occurrence: 1 },
          { title: "Amazon - Filters", total: 12.9, id: 2, occurrence: 1 },
          { title: "Amazon - Leather", total: 14.48, id: 3, occurrence: 1 },
        ],
        income: false,
        index: 10,
      },
      {
        id: 11,
        title: "Take Out",
        real: 70.16,
        forecast: 80,
        icon: "bike-fast",
        expenses: [
          { title: "Glovo", total: 12.18, id: 0, occurrence: 1 },
          { title: "Glovo", total: 12.18, id: 2, occurrence: 2 },
          { title: "Glovo", total: 14.9, id: 3, occurrence: 3 },
          { title: "Glovo", total: 14.9, id: 4, occurrence: 4 },
          { title: "Glovo", total: 16, id: 5, occurrence: 5 },
        ],
        income: false,
        index: 11,
      },
      {
        id: 12,
        title: "Trips",
        real: 50.95,
        forecast: 100,
        icon: "airplane-takeoff",
        expenses: [
          { title: "Florence - Lunch", total: 32.9, id: 0, occurrence: 1 },
          { title: "Train Turin", total: 18.05, id: 1, occurrence: 1 },
        ],
        income: false,
        index: 12,
      },
      {
        id: 13,
        title: "Extra",
        real: 1590,
        forecast: 1590,
        icon: "cupcake",
        expenses: [{ title: "Guitar", total: 1590, id: 0, occurrence: 1 }],
        income: false,
        index: 13,
      },
    ],
  },
  {
    title: "January, 2024",
    categories: [
      {
        forecast: { in: 1680, out: 1290 },
        icon: "chart-bar",
        id: 0,
        real: { in: 40, out: 532.75 },
        title: "Overall",
        index: 0,
      },
      {
        expenses: [{ id: 0, occurrence: 1, title: "Satispay", total: 40 }],
        forecast: -1680,
        icon: "cash-multiple",
        id: 1,
        income: true,
        real: -40,
        title: "Earnings",
        index: 1,
      },
      {
        expenses: [],
        forecast: 32,
        icon: "widgets",
        id: 2,
        income: false,
        index: 2,
        real: 0,
        title: "Subscriptions",
      },
      {
        expenses: [],
        forecast: 108,
        icon: "checkbook",
        id: 3,
        income: false,
        index: 3,
        real: 0,
        title: "Bills",
      },
      {
        expenses: [],
        forecast: 120,
        icon: "basket",
        id: 4,
        income: false,
        index: 4,
        real: 0,
        title: "Groceries",
      },
      {
        expenses: [{ id: 0, occurrence: 1, title: "Rent", total: 500 }],
        forecast: 500,
        icon: "home",
        id: 5,
        income: false,
        index: 5,
        real: 500,
        title: "Rent",
      },
      {
        expenses: [
          { id: 0, occurrence: 1, title: "AWS", total: 0.46 },
          { id: 1, occurrence: 1, title: "Imposta bollo", total: 2 },
          { id: 2, occurrence: 1, title: "Amazon", total: 12.89 },
        ],
        forecast: 70,
        icon: "dice-1",
        id: 6,
        income: false,
        index: 6,
        real: 15.35,
        title: "Week 1",
      },
      {
        expenses: [],
        forecast: 70,
        icon: "dice-2",
        id: 7,
        income: false,
        index: 7,
        real: 0,
        title: "Week 2",
      },
      {
        expenses: [],
        forecast: 70,
        icon: "dice-3",
        id: 8,
        income: false,
        index: 8,
        real: 0,
        title: "Week 3",
      },
      {
        expenses: [],
        forecast: 70,
        icon: "dice-4",
        id: 9,
        income: false,
        index: 9,
        real: 0,
        title: "Week 4",
      },
      {
        expenses: [],
        forecast: 70,
        icon: "dice-5",
        id: 10,
        income: false,
        index: 10,
        real: 0,
        title: "Week 5",
      },
      {
        expenses: [{ id: 0, occurrence: 1, title: "Glovo", total: 17.4 }],
        forecast: 80,
        icon: "bike-fast",
        id: 11,
        income: false,
        index: 11,
        real: 17.4,
        title: "Take Out",
      },
      {
        expenses: [],
        forecast: 100,
        icon: "airplane-takeoff",
        id: 12,
        income: false,
        index: 12,
        real: 0,
        title: "Trips",
      },
      {
        expenses: [],
        forecast: 0,
        icon: "cupcake",
        id: 13,
        income: false,
        index: 13,
        real: 0,
        title: "Extra",
      },
    ],
  },
];

export const defaultCategories = [
  {
    id: 0,
    title: "Overall",
    real: {
      in: 0,
      out: 0,
    },
    forecast: {
      in: 0,
      out: 0,
    },
    icon: "chart-bar",
    index: 0,
  },
  {
    id: 1,
    title: "Earnings",
    real: 0,
    forecast: 0,
    icon: "cash-multiple",
    expenses: [],
    income: true,
    index: 1,
  },
  {
    id: 2,
    title: "Subscriptions",
    real: 0,
    forecast: 0,
    icon: "widgets",
    expenses: [],
    income: false,
    index: 2,
  },
  {
    id: 3,
    title: "Bills",
    real: 0,
    forecast: 0,
    icon: "checkbook",
    expenses: [],
    income: false,
    index: 3,
  },
  {
    id: 4,
    title: "Groceries",
    real: 0,
    forecast: 0,
    icon: "basket",
    expenses: [],
    income: false,
    index: 4,
  },
  {
    id: 5,
    title: "Rent",
    real: 0,
    forecast: 0,
    icon: "home",
    expenses: [],
    income: false,
    index: 5,
  },
  {
    id: 6,
    title: "Week 1",
    real: 0,
    forecast: 0,
    icon: "dice-1",
    expenses: [],
    income: false,
    index: 6,
  },
  {
    id: 7,
    title: "Week 2",
    real: 0,
    forecast: 0,
    icon: "dice-2",
    expenses: [],
    income: false,
    index: 7,
  },
  {
    id: 8,
    title: "Week 3",
    real: 0,
    forecast: 0,
    icon: "dice-3",
    expenses: [],
    income: false,
    index: 8,
  },
  {
    id: 9,
    title: "Week 4",
    real: 0,
    forecast: 0,
    icon: "dice-4",
    expenses: [],
    income: false,
    index: 9,
  },
  {
    id: 10,
    title: "Week 5",
    real: 0,
    forecast: 0,
    icon: "dice-5",
    expenses: [],
    income: false,
    index: 10,
  },
  {
    id: 11,
    title: "Take Out",
    real: 0,
    forecast: 0,
    icon: "bike-fast",
    expenses: [],
    income: false,
    index: 11,
  },
  {
    id: 12,
    title: "Trips",
    real: 0,
    forecast: 0,
    icon: "airplane-takeoff",
    expenses: [],
    income: false,
    index: 12,
  },
  {
    id: 13,
    title: "Extra",
    real: 0,
    forecast: 0,
    icon: "cupcake",
    expenses: [],
    income: false,
    index: 13,
  },
];

export const defaultUser = {
  username: "Nappozord",
  email: "alenappo123@live.it",
  balance: 2941.59,
  preferences: [],
};

export const mealsDefault = [
  {
    date: "2024-01-08",
    breakfast: {
      ingredients: [{ id: 1, quantity: 1 }],
      recipes: [],
    },
    lunch: {
      ingredients: [],
      recipes: [],
    },
    dinner: {
      ingredients: [],
      recipes: [],
    },
    snack: {
      ingredients: [{ id: 1, quantity: 5 }],
      recipes: [],
    },
  },
  {
    date: "2024-01-09",
    breakfast: {
      ingredients: [{ id: 1, quantity: 1 }],
      recipes: [],
    },
    lunch: {
      ingredients: [],
      recipes: [],
    },
    dinner: {
      ingredients: [],
      recipes: [10],
    },
    snack: {
      ingredients: [{ id: 1, quantity: 5 }],
      recipes: [],
    },
  },
  {
    date: "2024-01-10",
    breakfast: {
      ingredients: [{ id: 1, quantity: 1 }],
      recipes: [],
    },
    lunch: {
      ingredients: [],
      recipes: [],
    },
    dinner: {
      ingredients: [],
      recipes: [2],
    },
    snack: {
      ingredients: [{ id: 1, quantity: 5 }],
      recipes: [],
    },
  },
  {
    date: "2024-01-11",
    breakfast: {
      ingredients: [],
      recipes: [0],
    },
    lunch: {
      ingredients: [],
      recipes: [4],
    },
    dinner: {
      ingredients: [],
      recipes: [3],
    },
    snack: {
      ingredients: [],
      recipes: [],
    },
  },
  {
    date: "2024-01-12",
    breakfast: {
      ingredients: [],
      recipes: [0],
    },
    lunch: {
      ingredients: [],
      recipes: [5],
    },
    dinner: {
      ingredients: [],
      recipes: [],
    },
    snack: {
      ingredients: [],
      recipes: [],
    },
  },
  {
    date: "2024-01-13",
    breakfast: {
      ingredients: [{ id: 1, quantity: 1 }],
      recipes: [0],
    },
    lunch: {
      ingredients: [],
      recipes: [6],
    },
    dinner: {
      ingredients: [],
      recipes: [7],
    },
    snack: {
      ingredients: [],
      recipes: [],
    },
  },
  {
    date: "2024-01-14",
    breakfast: {
      ingredients: [{ id: 1, quantity: 1 }],
      recipes: [0],
    },
    lunch: {
      ingredients: [],
      recipes: [8],
    },
    dinner: {
      ingredients: [],
      recipes: [9],
    },
    snack: {
      ingredients: [{ id: 1, quantity: 1 }],
      recipes: [],
    },
  },
];

export const ingredientsDefault = [
  {
    id: 0,
    title: "/",
    cost: 0,
    quantity: 0,
    stock: 0,
    duration: 0,
  },
  {
    id: 1,
    title: "Banana",
    cost: 1.7,
    quantity: 1,
    stock: 0,
    duration: 7,
  },
  {
    id: 2,
    title: "Nutella Biscuits",
    cost: 1.99,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 3,
    title: "Pane",
    cost: 1.79,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 4,
    title: "Pollo",
    cost: 3.5,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 5,
    title: "Parmigiano",
    cost: 2.99,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 6,
    title: "Passata Pomodoro",
    cost: 1.3,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 7,
    title: "Pasta (corta)",
    cost: 0.65,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 8,
    title: "Tonno",
    cost: 2.99,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 9,
    title: "Sugo Amatriciana",
    cost: 1.29,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 10,
    title: "Tacchino",
    cost: 1.35,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 11,
    title: "Wurstel",
    cost: 1.39,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 12,
    title: "Biscotti colazione",
    cost: 1.49,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 13,
    title: "Riso",
    cost: 2.99,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 14,
    title: "Olive Nere",
    cost: 1.19,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 15,
    title: "Pesto",
    cost: 1.19,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 16,
    title: "Pizza",
    cost: 2.79,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 17,
    title: "Ragù",
    cost: 1.5,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 18,
    title: "Olio Semi",
    cost: 1.79,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 19,
    title: "Pan Grattato",
    cost: 0.99,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 20,
    title: "Uova",
    cost: 1.99,
    quantity: 0,
    stock: 0,
    duration: 0,
  },
  {
    id: 21,
    title: "The",
    cost: 1.19,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 22,
    title: "Zucchero",
    cost: 0.99,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 23,
    title: "Sale",
    cost: 0.99,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 24,
    title: "Maionese",
    cost: 0.99,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
  {
    id: 25,
    title: "Ketchup",
    cost: 0.99,
    quantity: 0,
    stock: 0,
    duration: 7,
  },
];

export const recipesDefault = [
  {
    id: 0,
    title: "The e biscotti",
    icon: "food",
    used: 0,
    ingredients: [
      { id: 21, quantity: 1 / 25 },
      { id: 12, quantity: 1 / 8 },
      { id: 22, quantity: 1 / 100 },
    ],
  },
  {
    id: 1,
    title: "Hot-Dog",
    icon: "food",
    used: 0,
    ingredients: [
      { id: 3, quantity: 1 / 8 },
      { id: 11, quantity: 1 / 3 },
      { id: 24, quantity: 1 / 50 },
    ],
  },
  {
    id: 2,
    title: "Panino Tacchino",
    icon: "food",
    used: 0,
    ingredients: [
      { id: 3, quantity: 1 / 8 },
      { id: 10, quantity: 1 },
      { id: 24, quantity: 1 / 50 },
    ],
  },
  {
    id: 3,
    title: "Glovo Day",
    icon: "food",
    used: 0,
    ingredients: [],
  },
  {
    id: 4,
    title: "Pasta Amatriciana",
    icon: "food",
    used: 0,
    ingredients: [
      { id: 9, quantity: 1 / 2 },
      { id: 7, quantity: 1 / 3 },
    ],
  },
  {
    id: 5,
    title: "Riso Tonno Olive",
    icon: "food",
    used: 0,
    ingredients: [
      { id: 13, quantity: 1 / 20 },
      { id: 14, quantity: 1 / 8 },
      { id: 8, quantity: 1 / 8 },
    ],
  },
  {
    id: 6,
    title: "Pasta Pesto",
    icon: "food",
    used: 0,
    ingredients: [
      { id: 15, quantity: 1 / 20 },
      { id: 7, quantity: 1 / 8 },
    ],
  },
  {
    id: 7,
    title: "Pizza",
    icon: "food",
    used: 0,
    ingredients: [
      { id: 16, quantity: 1 / 20 },
      { id: 11, quantity: 1 / 8 },
    ],
  },
  {
    id: 8,
    title: "Pasta Ragù",
    icon: "food",
    used: 0,
    ingredients: [
      { id: 17, quantity: 1 / 20 },
      { id: 7, quantity: 1 / 8 },
    ],
  },
  {
    id: 9,
    title: "Pollo",
    icon: "food",
    used: 0,
    ingredients: [
      { id: 18, quantity: 1 / 20 },
      { id: 19, quantity: 1 / 8 },
      { id: 20, quantity: 1 / 20 },
      { id: 4, quantity: 1 / 8 },
      { id: 25, quantity: 1 / 50 },
    ],
  },
  {
    id: 10,
    title: "Panino Tonno",
    icon: "food",
    used: 0,
    ingredients: [
      { id: 8, quantity: 1 / 20 },
      { id: 3, quantity: 1 / 8 },
      { id: 24, quantity: 1 / 50 },
    ],
  },
];
