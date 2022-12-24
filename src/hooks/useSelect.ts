import { useState, useCallback, ChangeEvent } from 'react'

const useSelect = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setValue(e.currentTarget.value),
    []
  )

  return {
    value,
    onChange
  }
}

export default useSelect