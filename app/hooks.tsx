"use client";
import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: any) {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const storedValue = isLocalStorageAvailable
    ? localStorage.getItem(key)
    : null;

  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isLocalStorageAvailable]);

  const setStoredValue = (newValue: any) => {
    setValue(newValue);
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, setStoredValue];
}
