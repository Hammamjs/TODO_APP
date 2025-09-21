export const addToLoacalstorage = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalstorage = (key: string): unknown =>
  JSON.parse(localStorage.getItem(key)!);

export const isExistInLocalstorage = (key: string): boolean =>
  localStorage.getItem(key) !== null;

export const removeFromLocalstorage = (key: string): void => {
  if (isExistInLocalstorage(key)) {
    localStorage.removeItem(key);
  }
};
