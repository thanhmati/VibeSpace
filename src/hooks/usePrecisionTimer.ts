import { useState, useEffect, useRef, useCallback } from 'react'

export interface TimerConfig {
  initialDuration: number // in seconds
  onComplete?: () => void
}

export function usePrecisionTimer({ initialDuration, onComplete }: TimerConfig) {
  const [duration, setDuration] = useState(initialDuration)
  const [timeLeft, setTimeLeft] = useState(initialDuration)
  const [isRunning, setIsRunning] = useState(false)
  
  const timerRef = useRef<number | null>(null)
  const targetEndTimeRef = useRef<number | null>(null)
  const onCompleteRef = useRef(onComplete)
  
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Sync initial duration changes
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(initialDuration)
      setDuration(initialDuration)
    }
  }, [initialDuration, isRunning])

  const tick = useCallback(() => {
    if (!targetEndTimeRef.current) return

    const now = Date.now()
    const remaining = Math.max(0, Math.round((targetEndTimeRef.current - now) / 1000))
    
    setTimeLeft(remaining)

    if (remaining === 0) {
      setIsRunning(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      targetEndTimeRef.current = null
      onCompleteRef.current?.()
    }
  }, [])

  const start = useCallback(() => {
    if (isRunning) return

    const targetEndTime = Date.now() + timeLeft * 1000
    targetEndTimeRef.current = targetEndTime
    setIsRunning(true)
    
    tick() // Tick once immediately to align visual updates

    timerRef.current = window.setInterval(() => {
      tick()
    }, 200) // check 5 times per second for responsive clock syncing
  }, [isRunning, timeLeft, tick])

  const pause = useCallback(() => {
    if (!isRunning) return

    setIsRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    if (targetEndTimeRef.current) {
      const remaining = Math.max(0, Math.round((targetEndTimeRef.current - Date.now()) / 1000))
      setTimeLeft(remaining)
      targetEndTimeRef.current = null
    }
  }, [isRunning])

  const reset = useCallback((newDuration = duration) => {
    setIsRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    targetEndTimeRef.current = null
    setTimeLeft(newDuration)
  }, [duration])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    setTimeLeft
  }
}
