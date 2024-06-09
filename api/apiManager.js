import { realCategories } from "~/data";

export function restoreBackup(date) {
  const save = realCategories.find((obj) => obj.title === date).categories;
  saveCategories(save, { title: date });
}
