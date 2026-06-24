import React, { useState, useCallback } from 'react'
import { Play, Pause, X, SkipForward, SkipBack, WifiOff, Loader, Volume2, VolumeX, AlertCircle, CheckCircle } from 'lucide-react'
import { DEFAULT_LOFI_STREAMS, type LofiStream } from '../../data/mockData'
import { useYouTubePlayer } from '../../hooks/useYouTubePlayer'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import {
  extractYouTubeId,
  getYouTubeThumbnail,
  getRandomFallbackImage,
  validateYouTubeVideo,
} from '../../utils/youtube'

// ─── Album Art with YouTube thumbnail + fallback ───────────────────────────────
interface AlbumArtProps {
  videoId: string
  fallbackUrl: string
  alt: string
  isLoading: boolean
  hasError: boolean
}

const AlbumArt: React.FC<AlbumArtProps> = ({ videoId, fallbackUrl, alt, isLoading, hasError }) => {
  const [imgSrc, setImgSrc] = useState<string>(
    videoId ? getYouTubeThumbnail(videoId, 'mq') : fallbackUrl
  )

  const handleError = useCallback(() => {
    // If YouTube thumbnail failed, fall through to the original fallbackUrl,
    // then to a random Unsplash image
    if (imgSrc !== fallbackUrl && fallbackUrl) {
      setImgSrc(fallbackUrl)
    } else {
      setImgSrc(getRandomFallbackImage())
    }
  }, [imgSrc, fallbackUrl])

  // When videoId changes, reset to YouTube thumbnail
  React.useEffect(() => {
    setImgSrc(videoId ? getYouTubeThumbnail(videoId, 'mq') : fallbackUrl)
  }, [videoId, fallbackUrl])

  return (
    <div
      className="album-art-wrapper"
      style={{ margin: 0, position: 'relative', flexShrink: 0 }}
    >
      <img
        className="album-art"
        src={imgSrc}
        alt={alt}
        onError={handleError}
      />
      {isLoading && (
        <div
          style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', borderRadius: '8px',
            backgroundColor: 'rgba(0,0,0,0.55)',
          }}
        >
          <Loader size={18} color="var(--color-primary)" style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      )}
      {hasError && (
        <div
          style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', borderRadius: '8px',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
        >
          <WifiOff size={16} color="#f87171" />
        </div>
      )}
    </div>
  )
}

// ─── Volume Slider ─────────────────────────────────────────────────────────────
interface VolumeSliderProps {
  volume: number
  onVolumeChange: (v: number) => void
  disabled: boolean
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ volume, onVolumeChange, disabled }) => {
  const isMuted = volume === 0
  const toggleMute = () => onVolumeChange(isMuted ? 50 : 0)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <button
        onClick={toggleMute}
        disabled={disabled}
        title={isMuted ? 'Unmute' : 'Mute'}
        style={{
          background: 'none', border: 'none', cursor: disabled ? 'default' : 'pointer',
          padding: '2px', color: disabled ? 'rgba(255,255,255,0.2)' : 'var(--color-text-secondary)',
          display: 'flex', alignItems: 'center', flexShrink: 0,
          transition: 'color 0.2s',
        }}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      <div style={{ flex: 1, position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            position: 'absolute', left: 0, right: 0, height: '4px',
            borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.1)',
          }}
        />
        <div
          style={{
            position: 'absolute', left: 0, height: '4px',
            width: `${volume}%`, borderRadius: '9999px',
            backgroundColor: disabled ? 'rgba(255,255,255,0.15)' : 'var(--color-primary)',
            boxShadow: disabled ? 'none' : '0 0 6px rgba(74,222,128,0.5)',
            transition: 'width 0.1s, background-color 0.2s',
          }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          disabled={disabled}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          style={{
            position: 'absolute', left: 0, right: 0, width: '100%',
            opacity: 0, cursor: disabled ? 'default' : 'pointer',
            height: '20px', margin: 0,
          }}
          aria-label="Volume"
        />
      </div>
      <span
        style={{
          fontSize: '11px', fontFamily: 'var(--font-mono)', width: '28px', textAlign: 'right',
          color: disabled ? 'rgba(255,255,255,0.2)' : 'var(--color-text-secondary)',
          flexShrink: 0,
        }}
      >
        {volume}
      </span>
    </div>
  )
}

// ─── Validation status badge ───────────────────────────────────────────────────
type ValidationState = 'idle' | 'checking' | 'valid' | 'invalid'

interface ValidationBadgeProps {
  state: ValidationState
  message?: string
}

const ValidationBadge: React.FC<ValidationBadgeProps> = ({ state, message }) => {
  if (state === 'idle') return null

  const configs = {
    checking: { icon: <Loader size={13} style={{ animation: 'spin 1s linear infinite' }} />, color: 'rgba(255,255,255,0.5)', bg: 'rgba(255,255,255,0.06)', text: 'Checking link…' },
    valid:    { icon: <CheckCircle size={13} />, color: '#4ade80', bg: 'rgba(74,222,128,0.1)', text: message || 'Video found!' },
    invalid:  { icon: <AlertCircle size={13} />, color: '#f87171', bg: 'rgba(248,113,113,0.1)', text: message || 'Video unavailable' },
  }
  const cfg = configs[state]

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '6px 10px', borderRadius: '6px',
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.color}30`,
      }}
    >
      <span style={{ color: cfg.color, display: 'flex', alignItems: 'center' }}>{cfg.icon}</span>
      <span style={{ fontSize: '12px', color: cfg.color, fontFamily: 'var(--font-display)' }}>{cfg.text}</span>
    </div>
  )
}

// ─── Main LofiPlayer ──────────────────────────────────────────────────────────
interface LofiPlayerProps {
  visible: boolean
  onClose: () => void
}

export const LofiPlayer: React.FC<LofiPlayerProps> = ({ visible, onClose }) => {

  const [currentStream, setCurrentStream] = useLocalStorage<LofiStream>(
    'lofi-stream',
    DEFAULT_LOFI_STREAMS[0]
  )

  const [customUrl, setCustomUrl] = useState('')
  const [validationState, setValidationState] = useState<ValidationState>('idle')
  const [validationMsg, setValidationMsg] = useState('')

  const {
    isPlaying,
    trackInfo,
    isReady,
    status,
    errorMessage,
    currentTime,
    duration,
    durationKnown,
    volume,
    play,
    pause,
    setVolume,
    loadVideo,
    loadPlaylist,
  } = useYouTubePlayer('yt-player', currentStream.videoId)

  const handlePlayPause = () => {
    if (!isReady) return
    isPlaying ? pause() : play()
  }

  const handleStreamClick = async (stream: LofiStream) => {
    setCurrentStream(stream)
    if (stream.playlistId) {
      loadPlaylist(stream.playlistId, true)
    } else if (stream.videoId) {
      // Validate before loading for curated streams (silent — just load)
      loadVideo(stream.videoId, true)
    }
  }

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = customUrl.trim()
    if (!trimmed) return

    const { videoId, playlistId } = extractYouTubeId(trimmed)

    if (playlistId) {
      // Playlists: no noembed support, just try loading directly
      setValidationState('checking')
      setValidationMsg('')
      await new Promise(r => setTimeout(r, 300)) // tiny delay for UX
      const newStream: LofiStream = {
        id: `custom-playlist-${playlistId}`,
        title: 'Custom Playlist',
        channel: 'YouTube Playlist',
        videoId: videoId || '',
        playlistId,
        imageUrl: videoId ? getYouTubeThumbnail(videoId, 'mq') : getRandomFallbackImage(),
      }
      setCurrentStream(newStream)
      loadPlaylist(playlistId, true)
      setCustomUrl('')
      setValidationState('valid')
      setValidationMsg('Playlist loaded!')
      setTimeout(() => setValidationState('idle'), 3000)
    } else if (videoId) {
      // Single video: validate via noembed
      setValidationState('checking')
      setValidationMsg('')
      const result = await validateYouTubeVideo(videoId)
      if (!result.ok) {
        setValidationState('invalid')
        setValidationMsg(result.error || 'Video not available or embedding disabled')
        return
      }
      const newStream: LofiStream = {
        id: `custom-video-${videoId}`,
        title: result.title || 'Custom YouTube Video',
        channel: result.author || 'YouTube',
        videoId,
        imageUrl: result.thumbnailUrl || getYouTubeThumbnail(videoId, 'mq'),
      }
      setCurrentStream(newStream)
      loadVideo(videoId, true)
      setCustomUrl('')
      setValidationState('valid')
      setValidationMsg(result.title ? `"${result.title.slice(0, 32)}${result.title.length > 32 ? '…' : ''}"` : 'Video loaded!')
      setTimeout(() => setValidationState('idle'), 3000)
    } else {
      setValidationState('invalid')
      setValidationMsg('Could not parse a YouTube Video or Playlist ID from this URL')
    }
  }

  const handleSkipStream = (direction: 'next' | 'prev') => {
    const currentIndex = DEFAULT_LOFI_STREAMS.findIndex(s => s.id === currentStream.id)
    const baseIndex = currentIndex === -1 ? 0 : currentIndex
    let nextIndex = direction === 'next' ? baseIndex + 1 : baseIndex - 1
    if (nextIndex >= DEFAULT_LOFI_STREAMS.length) nextIndex = 0
    if (nextIndex < 0) nextIndex = DEFAULT_LOFI_STREAMS.length - 1
    handleStreamClick(DEFAULT_LOFI_STREAMS[nextIndex])
  }

  const formatTime = (s: number) => {
    if (isNaN(s) || !isFinite(s) || s <= 0) return '00:00'
    const m = Math.floor((s % 3600) / 60)
    const sec = Math.floor(s % 60)
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  // isLiveStream is only determined AFTER duration is known.
  // duration===0 at startup should not be treated as live.
  const isLiveStream = durationKnown && (!isFinite(duration) || duration === 0 || duration > 43200)
  const progressRatio = isLiveStream ? 1.0 : durationKnown && duration > 0 ? Math.min(currentTime / duration, 1) : 0
  const isLoading = status === 'loading'
  const hasError = status === 'error' || status === 'unavailable'

  return (
    // Wrapper: always in DOM (so YouTube player persists), visually hidden when closed
    <div style={{ display: visible ? 'contents' : 'none' }}>
    <div
      className="glass-panel music-widget"
      style={{
        width: '360px',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-whisper-border)', paddingBottom: '16px' }}>
        <h2 className="font-h2 text-text-primary" style={{ margin: 0 }}>Lofi Music</h2>
        <button
          onClick={onClose}
          title="Close Panel"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', color: 'var(--color-text-secondary)' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* ── Now Playing ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 className="uppercase tracking-wider text-text-secondary font-medium" style={{ fontSize: '11px', letterSpacing: '0.1em', fontFamily: 'var(--font-display)', margin: 0 }}>
          Now Playing
        </h3>

        {/* Album art + track info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <AlbumArt
            videoId={currentStream.videoId}
            fallbackUrl={currentStream.imageUrl}
            alt={currentStream.title}
            isLoading={isLoading}
            hasError={hasError}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4
              style={{
                fontSize: '14px', fontWeight: 600, margin: 0,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                color: hasError ? '#f87171' : 'var(--color-text-primary)',
              }}
            >
              {isLoading ? 'Connecting…'
                : hasError ? 'Unavailable'
                : (trackInfo.title || currentStream.title)}
            </h4>
            <p
              style={{
                fontSize: '12px', margin: '4px 0 0 0',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                color: hasError ? '#f87171' : 'var(--color-text-secondary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {isLoading ? 'Loading YouTube player…'
                : hasError ? (errorMessage || 'Could not play this video')
                : (trackInfo.channel || currentStream.channel)}
            </p>
          </div>
        </div>

        {/* Connection status dot */}
        {!hasError && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
              backgroundColor: isReady ? 'var(--color-primary)' : 'rgba(255,255,255,0.25)',
              boxShadow: isReady ? '0 0 6px rgba(74,222,128,0.6)' : 'none',
              transition: 'all 0.4s',
            }} />
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
              {isLoading ? 'Initializing…' : 'YouTube Connected'}
            </span>
          </div>
        )}

        {/* Error banner */}
        {hasError && (
          <div style={{
            padding: '10px 12px', borderRadius: '8px',
            backgroundColor: 'rgba(248,113,113,0.1)',
            border: '1px solid rgba(248,113,113,0.2)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <WifiOff size={14} color="#f87171" />
            <span style={{ fontSize: '12px', color: '#f87171', fontFamily: 'var(--font-display)', flex: 1 }}>
              {errorMessage || 'Video unavailable.'} Try another stream.
            </span>
          </div>
        )}

        {/* Progress bar */}
        <div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: isLoading ? '40%' : `${progressRatio * 100}%`,
              backgroundColor: isLoading ? 'rgba(255,255,255,0.15)' : 'var(--color-primary)',
              borderRadius: '9999px',
              transition: isLoading ? 'none' : 'width 0.25s linear',
              boxShadow: isLoading ? 'none' : '0 0 8px rgba(74,222,128,0.45)',
              animation: isLoading ? 'pulse-bar 1.5s ease-in-out infinite' : 'none',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '10px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
            <span>
              {!durationKnown && isPlaying
                ? '--:--'
                : isLiveStream
                  ? '● LIVE'
                  : formatTime(currentTime)}
            </span>
            <span>
              {!durationKnown && isPlaying
                ? '--:--'
                : isLiveStream
                  ? 'Stream'
                  : formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Playback controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => handleSkipStream('prev')}
            disabled={!isReady}
            title="Previous Stream"
            style={{
              width: '40px', height: '40px', background: 'none', border: 'none',
              cursor: isReady ? 'pointer' : 'default', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-text-secondary)', opacity: isReady ? 1 : 0.35,
              transition: 'opacity 0.2s',
            }}
          >
            <SkipBack size={22} />
          </button>

          <button
            onClick={handlePlayPause}
            disabled={!isReady}
            title={isLoading ? 'Connecting…' : isPlaying ? 'Pause' : 'Play'}
            style={{
              width: '54px', height: '54px', padding: 0, borderRadius: '50%', flexShrink: 0,
              opacity: isReady ? 1 : 0.4, cursor: isReady ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: isReady ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
              border: '1px solid var(--color-whisper-border)',
              color: 'var(--color-text-primary)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'all 0.2s',
            }}
          >
            {isLoading
              ? <Loader size={22} style={{ animation: 'spin 1s linear infinite' }} />
              : isPlaying
                ? <Pause size={26} fill="currentColor" />
                : <Play size={26} fill="currentColor" style={{ marginLeft: '3px' }} />
            }
          </button>

          <button
            onClick={() => handleSkipStream('next')}
            disabled={!isReady}
            title="Next Stream"
            style={{
              width: '40px', height: '40px', background: 'none', border: 'none',
              cursor: isReady ? 'pointer' : 'default', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-text-secondary)', opacity: isReady ? 1 : 0.35,
              transition: 'opacity 0.2s',
            }}
          >
            <SkipForward size={22} />
          </button>
        </div>

        {/* ── Volume Slider ── */}
        <div>
          <VolumeSlider volume={volume} onVolumeChange={setVolume} disabled={!isReady} />
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--color-whisper-border)' }} />

      {/* ── Curated Streams ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 className="uppercase tracking-wider text-text-secondary font-medium" style={{ fontSize: '11px', letterSpacing: '0.1em', fontFamily: 'var(--font-display)', margin: 0 }}>
          Curated Streams
        </h3>
        <div className="music-streams-scroller scroller" style={{ maxHeight: '168px', overflowY: 'auto', paddingRight: '4px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '3px', margin: 0, padding: 0 }}>
            {DEFAULT_LOFI_STREAMS.map((stream) => {
              const isActive = currentStream.id === stream.id
              return (
                <li key={stream.id}>
                  <button
                    className={`stream-select-btn-stitch ${isActive ? 'active' : ''}`}
                    onClick={() => handleStreamClick(stream)}
                    style={{ cursor: 'pointer', outline: 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', minWidth: 0 }}>
                      <div style={{
                        width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
                        backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                        border: isActive ? 'none' : '1px solid rgba(255,255,255,0.2)',
                        boxShadow: isActive ? '0 0 5px rgba(74,222,128,0.5)' : 'none',
                      }} />
                      <span style={{
                        fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-display)',
                        color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        flexGrow: 1, textAlign: 'left', transition: 'color 0.2s',
                      }}>
                        {stream.title}
                      </span>
                      {isActive && isPlaying && (
                        <div className="visualizer-wave" style={{ padding: 0, height: '14px', display: 'flex', gap: '2px', alignItems: 'flex-end', flexShrink: 0 }}>
                          <div className="visualizer-bar" style={{ width: '3px' }} />
                          <div className="visualizer-bar" style={{ width: '3px' }} />
                          <div className="visualizer-bar" style={{ width: '3px' }} />
                        </div>
                      )}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--color-whisper-border)' }} />

      {/* ── Custom YouTube Link ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 className="uppercase tracking-wider text-text-secondary font-medium" style={{ fontSize: '11px', letterSpacing: '0.1em', fontFamily: 'var(--font-display)', margin: 0 }}>
          Custom YouTube Link
        </h3>
        <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '8px', width: '100%' }}>
          <label htmlFor="custom-stream-input" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            Custom YouTube URL
          </label>
          <input
            id="custom-stream-input"
            type="text"
            placeholder="Paste YouTube URL or video ID…"
            value={customUrl}
            onChange={(e) => {
              setCustomUrl(e.target.value)
              if (validationState !== 'idle') setValidationState('idle')
            }}
            style={{
              flexGrow: 1,
              backgroundColor: 'rgba(0,0,0,0.3)',
              border: `1px solid ${validationState === 'invalid' ? 'rgba(248,113,113,0.5)' : validationState === 'valid' ? 'rgba(74,222,128,0.4)' : 'var(--color-whisper-border)'}`,
              borderRadius: '8px', padding: '8px 12px',
              color: 'var(--color-text-primary)', fontSize: '14px',
              fontFamily: 'var(--font-display)', outline: 'none', minWidth: 0,
              transition: 'border-color 0.2s',
            }}
          />
          <button
            type="submit"
            disabled={!isReady || !customUrl.trim() || validationState === 'checking'}
            style={{
              backgroundColor: isReady && customUrl.trim() && validationState !== 'checking'
                ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
              color: isReady && customUrl.trim() && validationState !== 'checking'
                ? 'var(--color-canvas-base)' : 'rgba(255,255,255,0.3)',
              fontWeight: 600, padding: '8px 14px', borderRadius: '8px',
              border: 'none', cursor: isReady && customUrl.trim() && validationState !== 'checking' ? 'pointer' : 'default',
              fontSize: '13px', fontFamily: 'var(--font-display)',
              display: 'flex', alignItems: 'center', gap: '6px',
              whiteSpace: 'nowrap', transition: 'all 0.2s', flexShrink: 0,
            }}
          >
            {validationState === 'checking'
              ? <><Loader size={13} style={{ animation: 'spin 1s linear infinite' }} /> Checking</>
              : 'Play'}
          </button>
        </form>

        {/* Validation feedback */}
        <ValidationBadge state={validationState} message={validationMsg} />

        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', margin: 0, fontFamily: 'var(--font-display)' }}>
          Supports video URLs, playlist URLs, and 11-char video IDs
        </p>
      </div>
    </div>
    </div>
  )
}

export default LofiPlayer
