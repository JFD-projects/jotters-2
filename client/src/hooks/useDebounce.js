import { useRef, useState } from 'react'

export default function useDebounceState(defaultValue, delay) {
  const [value, setValue] = useState(defaultValue)

  const timeoutID = useRef(null)

  const setDebounceValue = (value) => {
    if (timeoutID.current) clearTimeout(timeoutID.current)
    timeoutID.current = setTimeout(() => {
      setValue(value)
    }, delay)
  }

  return [value, setDebounceValue]
}
