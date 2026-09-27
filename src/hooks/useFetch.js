import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const fetcherRef = useRef(fetcher)

  useLayoutEffect(() => {
    fetcherRef.current = fetcher
  })

  const refetch = useCallback(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)
    fetcherRef
      .current()
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/use-memo -- deps is a caller-supplied array for this generic data-fetching hook
  }, deps)

  useEffect(() => refetch(), [refetch])

  return { data, error, isLoading, refetch }
}
