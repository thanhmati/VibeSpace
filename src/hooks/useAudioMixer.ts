import { useEffect, useRef } from 'react'
import { AMBIENT_SOUNDS } from '../data/mockData'
import { useLocalStorage } from './useLocalStorage'

interface VolumeMap {
  [key: string]: number
}

interface ActiveMap {
  [key: string]: boolean
}

const defaultVolumes = (() => {
  const init: VolumeMap = {}
  AMBIENT_SOUNDS.forEach((s) => {
    init[s.key] = s.defaultVolume
  })
  return init
})()

const defaultActives = (() => {
  const init: ActiveMap = {}
  AMBIENT_SOUNDS.forEach((s) => {
    init[s.key] = false // All off by default to save bandwidth
  })
  return init
})()

export function useAudioMixer(isMasterMuted: boolean) {
  const [volumes, setVolumes] = useLocalStorage<VolumeMap>('ambient-volumes', defaultVolumes)
  const [activeStates, setActiveStates] = useLocalStorage<ActiveMap>('ambient-active', defaultActives)

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  // Initialize Audio Elements
  useEffect(() => {
    AMBIENT_SOUNDS.forEach((sound) => {
      const audio = new Audio(sound.audioUrl)
      audio.loop = true
      audio.preload = 'metadata'
      
      // Calculate individual volume
      const storedVol = volumes[sound.key] ?? sound.defaultVolume
      audio.volume = (storedVol / 100) * (isMasterMuted ? 0 : 1)
      
      audioRefs.current[sound.key] = audio
    })

    return () => {
      // Stop and clean up all audio elements on unmount
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause()
        audio.src = ''
      })
      audioRefs.current = {}
    }
  }, [])

  // Sync volume adjustments and active states
  useEffect(() => {
    AMBIENT_SOUNDS.forEach((sound) => {
      const audio = audioRefs.current[sound.key]
      if (!audio) return

      const active = activeStates[sound.key]
      const volume = volumes[sound.key] ?? sound.defaultVolume

      // Set volume with master mute factored in
      audio.volume = (volume / 100) * (isMasterMuted ? 0 : 1)

      if (active && !isMasterMuted) {
        if (audio.paused) {
          audio.play().catch((err) => {
            console.warn(`Audio play failed for "${sound.key}":`, err)
          })
        }
      } else {
        if (!audio.paused) {
          audio.pause()
        }
      }
    })
  }, [volumes, activeStates, isMasterMuted])

  const setSoundVolume = (key: string, volume: number) => {
    setVolumes((prev) => ({ ...prev, [key]: volume }))
    if (volume > 0 && !activeStates[key]) {
      setActiveStates((prev) => ({ ...prev, [key]: true }))
    }
  }

  const toggleSoundActive = (key: string) => {
    setActiveStates((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return {
    volumes,
    activeStates,
    setVolume: setSoundVolume,
    toggleSoundActive
  }
}
