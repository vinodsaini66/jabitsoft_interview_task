import { useState, useEffect } from 'react';
import { is_array, is_object, safe_json_parse } from '../lib/helper';

function useLocalStorage<T>(key: string, initialValue: T = null as T) {
  // Get from localStorage or return initialValue
  const readValue = () => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return safe_json_parse(item, initialValue);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Update localStorage and state
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
  
      if (typeof window !== 'undefined') {
        const valueToSave = is_array(valueToStore) || is_object(valueToStore) ? JSON.stringify(valueToStore) : String(valueToStore);
  
        window.localStorage.setItem(key, valueToSave);
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };
  

  // Update state if storage manually changed elsewhere
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
