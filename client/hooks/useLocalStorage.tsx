'use client'
import { useEffect, useState } from 'react'

type SetValue<T> = T | ((val: T) => T)

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void] {
  // Always initialise with initialValue so SSR and client render match
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // After mount, read the real value from localStorage (client-only)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) setStoredValue(JSON.parse(item))
    } catch (error) {
      console.log(error)
    }
  }, [key])

  // Persist to localStorage whenever the value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.log(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
