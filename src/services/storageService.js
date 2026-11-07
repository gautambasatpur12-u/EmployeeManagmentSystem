import { defaultData } from "../data/defaultData";

const KEY = "emsData";

export function loadData() {
  try {
    const saved = localStorage.getItem(KEY);
    if (!saved) return structuredClone(defaultData);
    const parsed = JSON.parse(saved);
    return { ...structuredClone(defaultData), ...parsed, salaries: parsed.salaries || [] };
  } catch {
    return structuredClone(defaultData);
  }
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
