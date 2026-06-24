import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: (() => void) | undefined
  }
}

let apiLoadedPromise: Promise<void> | null = null

function loadYouTubeAPI(): Promise<void> {
  if (apiLoadedPromise) return apiLoadedPromise

  apiLoadedPromise = new Promise((resolve) => {
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
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
  })

  return apiLoadedPromise
}

export function useYouTubePlayer(elementId: string, initialVideoId: string) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [trackInfo, setTrackInfo] = useState({ title: 'Cozy Rainy Lofi Stream', channel: 'Chillhop Music' })
  const [isReady, setIsReady] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const playerRef = useRef<any>(null)

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

    loadYouTubeAPI().then(() => {
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
        },
        events: {
          onReady: (event: any) => {
            if (!active) return
            setIsReady(true)
            event.target.setVolume(volume)
          },
          onStateChange: (event: any) => {
            if (!active) return
            // YT.PlayerState.PLAYING = 1, PAUSED = 2
            if (event.data === 1) {
              setIsPlaying(true)
              const data = event.target.getVideoData()
              if (data) {
                setTrackInfo({
                  title: data.title || 'Lofi Stream',
                  channel: data.author || 'YouTube Audio'
                })
              }
            } else {
              setIsPlaying(false)
            }
          }
        }
      })
    })

    return () => {
      active = false
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }
    }
  }, [elementId])

  // Poll current playback progress
  useEffect(() => {
    if (!isReady || !isPlaying) return

    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        try {
          setCurrentTime(playerRef.current.getCurrentTime())
          setDuration(playerRef.current.getDuration() || 0)
        } catch (e) {
          // ignore potential iframe connection errors
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isReady, isPlaying])

  const play = () => {
    if (playerRef.current && isReady) {
      playerRef.current.playVideo()
    }
  }

  const pause = () => {
    if (playerRef.current && isReady) {
      playerRef.current.pauseVideo()
    }
  }

  const setPlayerVolume = (newVolume: number) => {
    setVolume(newVolume)
    if (playerRef.current && isReady) {
      playerRef.current.setVolume(newVolume)
    }
  }

  const loadVideo = (videoId: string) => {
    if (playerRef.current && isReady) {
      playerRef.current.loadVideoById(videoId)
    }
  }

  const loadPlaylist = (playlistId: string) => {
    if (playerRef.current && isReady) {
      playerRef.current.loadPlaylist({ list: playlistId, listType: 'playlist' })
    }
  }

  return {
    isPlaying,
    volume,
    trackInfo,
    isReady,
    currentTime,
    duration,
    play,
    pause,
    setVolume: setPlayerVolume,
    loadVideo,
    loadPlaylist
  }
}
