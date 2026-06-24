import { useEffect, useRef, useState, useCallback } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: (() => void) | undefined
  }
}

let apiLoadedPromise: Promise<void> | null = null

function loadYouTubeAPI(): Promise<void> {
  if (apiLoadedPromise) return apiLoadedPromise

  apiLoadedPromise = new Promise((resolve, reject) => {
    if (window.YT && window.YT.Player) {
      resolve()
      return
    }

    const previousReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (previousReady) previousReady()
      resolve()
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    tag.onerror = () => reject(new Error('Failed to load YouTube IFrame API'))
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
  })

  return apiLoadedPromise
}

export type PlayerStatus = 'loading' | 'ready' | 'error' | 'unavailable'

export function useYouTubePlayer(elementId: string, initialVideoId: string) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [trackInfo, setTrackInfo] = useState({ title: '', channel: '' })
  const [status, setStatus] = useState<PlayerStatus>('loading')
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [durationKnown, setDurationKnown] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const playerRef = useRef<any>(null)
  const pendingPlayRef = useRef(false)

  // Derived convenience bool for backward compat
  const isReady = status === 'ready'

  useEffect(() => {
    let active = true

    // Create an invisible div in the body to mount the YT player if it doesn't exist
    let container = document.getElementById(elementId)
    if (!container) {
      container = document.createElement('div')
      container.id = elementId
      container.style.position = 'absolute'
      container.style.width = '0'
      container.style.height = '0'
      container.style.opacity = '0'
      container.style.pointerEvents = 'none'
      document.body.appendChild(container)
    }

    setStatus('loading')
    setErrorMessage('')

    loadYouTubeAPI()
      .then(() => {
        if (!active) return

        playerRef.current = new window.YT.Player(elementId, {
          height: '0',
          width: '0',
          videoId: initialVideoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            // Allow embedding
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              if (!active) return
              setStatus('ready')
              event.target.setVolume(volume)
              // If a play was requested before ready, execute it now
              if (pendingPlayRef.current) {
                pendingPlayRef.current = false
                event.target.playVideo()
              }
            },
            onStateChange: (event: any) => {
              if (!active) return
              // YT.PlayerState: UNSTARTED=-1, ENDED=0, PLAYING=1, PAUSED=2, BUFFERING=3, CUED=5
              if (event.data === 1) {
                setIsPlaying(true)
                const data = event.target.getVideoData()
                if (data && data.title) {
                  setTrackInfo({
                    title: data.title || '',
                    channel: data.author || ''
                  })
                }
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false)
              }
            },
            onError: (event: any) => {
              if (!active) return
              // YouTube error codes: 2=invalid param, 5=HTML5 error, 100=not found, 101/150=embedding not allowed
              const code = event.data
              let msg = 'Playback error'
              if (code === 100) msg = 'Video not found or private'
              else if (code === 101 || code === 150) msg = 'Embedding not allowed for this video'
              else if (code === 2) msg = 'Invalid video ID'
              console.warn(`[LofiPlayer] YouTube error ${code}: ${msg}`)
              setStatus('unavailable')
              setErrorMessage(msg)
              setIsPlaying(false)
            }
          }
        })
      })
      .catch((err) => {
        if (!active) return
        console.error('[LofiPlayer] Failed to load YouTube API:', err)
        setStatus('error')
        setErrorMessage('Could not connect to YouTube. Check your network.')
      })

    return () => {
      active = false
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy()
        } catch (_) { /* ignore */ }
        playerRef.current = null
      }
    }
  }, [elementId])

  // Poll current playback progress
  useEffect(() => {
    if (!isReady || !isPlaying) return

    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        try {
          const ct = playerRef.current.getCurrentTime() ?? 0
          const d = playerRef.current.getDuration() ?? 0
          setCurrentTime(ct)
          setDuration(d)
          // Mark duration as known once we receive any finite positive value
          if (d > 0 && isFinite(d)) {
            setDurationKnown(true)
          }
        } catch (e) {
          // ignore potential iframe connection errors
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isReady, isPlaying])

  const play = useCallback(() => {
    if (playerRef.current && isReady) {
      playerRef.current.playVideo()
    } else {
      // Queue play for when player becomes ready
      pendingPlayRef.current = true
    }
  }, [isReady])

  const pause = useCallback(() => {
    pendingPlayRef.current = false
    if (playerRef.current && isReady) {
      playerRef.current.pauseVideo()
    }
  }, [isReady])

  const setPlayerVolume = useCallback((newVolume: number) => {
    setVolume(newVolume)
    if (playerRef.current && isReady) {
      playerRef.current.setVolume(newVolume)
    }
  }, [isReady])

  const loadVideo = useCallback((videoId: string, autoPlay = true) => {
    setTrackInfo({ title: '', channel: '' })
    setCurrentTime(0)
    setDuration(0)
    setDurationKnown(false)  // reset — will be re-determined once playing
    setStatus('ready') // reset error state
    setErrorMessage('')
    if (playerRef.current && isReady) {
      if (autoPlay) {
        playerRef.current.loadVideoById(videoId)
      } else {
        playerRef.current.cueVideoById(videoId)
      }
    }
  }, [isReady])

  const loadPlaylist = useCallback((playlistId: string, autoPlay = true) => {
    setTrackInfo({ title: '', channel: '' })
    setCurrentTime(0)
    setDuration(0)
    setDurationKnown(false)  // reset — will be re-determined once playing
    setStatus('ready')
    setErrorMessage('')
    if (playerRef.current && isReady) {
      if (autoPlay) {
        playerRef.current.loadPlaylist({ list: playlistId, listType: 'playlist' })
      } else {
        playerRef.current.cuePlaylist({ list: playlistId, listType: 'playlist' })
      }
    }
  }, [isReady])

  return {
    isPlaying,
    volume,
    trackInfo,
    isReady,
    status,
    errorMessage,
    currentTime,
    duration,
    durationKnown,
    play,
    pause,
    setVolume: setPlayerVolume,
    loadVideo,
    loadPlaylist,
  }
}
