import { useState, useCallback } from "react";
// Не использовал, но оставил на случай,
// если результаты тестирования нужно будет прокинуть через props, а не через Context
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return {storedValue, setValue}
}
export default useLocalStorage;
