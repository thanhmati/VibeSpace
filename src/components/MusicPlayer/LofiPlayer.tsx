import React, { useState } from 'react'
import { Play, Pause, X, SkipForward, SkipBack } from 'lucide-react'
import { DEFAULT_LOFI_STREAMS, type LofiStream } from '../../data/mockData'
import { useYouTubePlayer } from '../../hooks/useYouTubePlayer'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useWorkspace } from '../../context/WorkspaceContext'
import { extractYouTubeId } from '../../utils/youtube'

export const LofiPlayer: React.FC = () => {
  const { setActivePanel } = useWorkspace()
  
  const [currentStream, setCurrentStream] = useLocalStorage<LofiStream>(
    'lofi-stream', 
    DEFAULT_LOFI_STREAMS[0]
  )
  
  const [customUrl, setCustomUrl] = useState('')

  const {
    isPlaying,
    trackInfo,
    isReady,
    currentTime,
    duration,
    play,
    pause,
    loadVideo,
    loadPlaylist
  } = useYouTubePlayer('yt-player', currentStream.videoId)

  const handlePlayPause = () => {
    if (!isReady) return
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const handleStreamClick = (stream: LofiStream) => {
    setCurrentStream(stream)
    if (stream.playlistId) {
      loadPlaylist(stream.playlistId)
    } else {
      loadVideo(stream.videoId)
    }
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customUrl.trim()) return

    const { videoId, playlistId } = extractYouTubeId(customUrl)
    
    if (playlistId) {
      const newStream: LofiStream = {
        id: `custom-playlist-${playlistId}`,
        title: 'Custom YouTube Playlist',
        channel: 'User Playlist',
        videoId: '',
        playlistId: playlistId,
        imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?auto=format&fit=crop&w=120&q=80'
      }
      setCurrentStream(newStream)
      loadPlaylist(playlistId)
      setCustomUrl('')
    } else if (videoId) {
      const newStream: LofiStream = {
        id: `custom-video-${videoId}`,
        title: 'Custom YouTube Stream',
        channel: 'User Link',
        videoId: videoId,
        imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?auto=format&fit=crop&w=120&q=80'
      }
      setCurrentStream(newStream)
      loadVideo(videoId)
      setCustomUrl('')
    } else {
      alert('Could not parse Video ID or Playlist ID from URL. Please try another link.')
    }
  }

  const handleSkipStream = (direction: 'next' | 'prev') => {
    const currentIndex = DEFAULT_LOFI_STREAMS.findIndex(s => s.id === currentStream.id)
    if (currentIndex === -1) return

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    if (nextIndex >= DEFAULT_LOFI_STREAMS.length) nextIndex = 0
    if (nextIndex < 0) nextIndex = DEFAULT_LOFI_STREAMS.length - 1

    handleStreamClick(DEFAULT_LOFI_STREAMS[nextIndex])
  }

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds) || timeInSeconds <= 0) return '00:00'
    const mins = Math.floor((timeInSeconds % 3600) / 60)
    const secs = Math.floor(timeInSeconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const isLiveStream = duration === 0 || duration > 43200
  const progressRatio = isLiveStream ? 1.0 : duration > 0 ? currentTime / duration : 0.0

  return (
    <div 
      className="glass-panel music-widget"
      style={{ 
        width: '360px', 
        borderRadius: '16px', 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-whisper-border)', paddingBottom: '16px' }}>
        <h2 className="font-h2 text-text-primary" style={{ margin: 0 }}>
          Lofi Music
        </h2>
        <button
          className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
          onClick={() => setActivePanel(null)}
          title="Close Panel"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Section 1: Now Playing */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 className="uppercase tracking-wider text-text-secondary font-medium" style={{ fontSize: '14px', fontFamily: 'var(--font-display)', margin: 0 }}>
          Now Playing
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="album-art-wrapper" style={{ margin: 0 }}>
            <img
              className="album-art"
              src={currentStream.imageUrl}
              alt={currentStream.title}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 
              className="text-text-primary" 
              style={{ 
                fontSize: '14px', 
                fontWeight: 500, 
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {trackInfo.title || currentStream.title}
            </h4>
            <p 
              className="font-mono text-text-secondary" 
              style={{ 
                fontSize: '12px', 
                margin: '4px 0 0 0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {trackInfo.channel || currentStream.channel}
            </p>
          </div>
        </div>

        {/* Progress Bar & Timestamps */}
        <div style={{ width: '100%' }}>
          <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden', position: 'relative' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${progressRatio * 100}%`, 
                backgroundColor: 'var(--color-primary)', 
                borderRadius: '9999px',
                transition: 'width 0.25s linear',
                boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)'
              }} 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '10px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
            <span>{isLiveStream ? 'LIVE' : formatTime(currentTime)}</span>
            <span>{isLiveStream ? 'Stream' : formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls Row */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginTop: '8px' }}>
          <button 
            onClick={() => handleSkipStream('prev')} 
            disabled={!isReady}
            title="Previous Track"
            style={{ 
              width: '40px', 
              height: '40px', 
              background: 'none', 
              border: 'none', 
              cursor: isReady ? 'pointer' : 'default', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'var(--color-text-secondary)',
              opacity: isReady ? 1 : 0.5
            }}
          >
            <SkipBack size={24} color="currentColor" />
          </button>
          
          <button 
            onClick={handlePlayPause}
            disabled={!isReady}
            style={{ 
              width: '56px', 
              height: '56px', 
              padding: 0, 
              borderRadius: '50%', 
              flexShrink: 0, 
              opacity: isReady ? 1 : 0.5,
              cursor: isReady ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--color-whisper-border)',
              color: 'var(--color-text-primary)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'all 0.2s'
            }}
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />}
          </button>
          
          <button 
            onClick={() => handleSkipStream('next')} 
            disabled={!isReady}
            title="Next Track"
            style={{ 
              width: '40px', 
              height: '40px', 
              background: 'none', 
              border: 'none', 
              cursor: isReady ? 'pointer' : 'default', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'var(--color-text-secondary)',
              opacity: isReady ? 1 : 0.5
            }}
          >
            <SkipForward size={24} color="currentColor" />
          </button>
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--color-whisper-border)', width: '100%' }} />

      {/* Section 2: Curated Streams */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 className="uppercase tracking-wider text-text-secondary font-medium" style={{ fontSize: '14px', fontFamily: 'var(--font-display)', margin: 0 }}>
          Curated Streams
        </h3>
        <div className="music-streams-scroller scroller" style={{ maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', margin: 0, padding: 0 }}>
            {DEFAULT_LOFI_STREAMS.map((stream) => {
              const isActive = currentStream.id === stream.id
              
              return (
                <li key={stream.id}>
                  <button
                    className={`stream-select-btn-stitch ${isActive ? 'active' : ''}`}
                    onClick={() => handleStreamClick(stream)}
                    style={{ cursor: 'pointer', outline: 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', minWidth: 0 }}>
                      <div 
                        className="rounded-full" 
                        style={{ 
                          width: '8px', 
                          height: '8px', 
                          backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                          boxShadow: isActive ? '0 0 5px rgba(74, 222, 128, 0.5)' : 'none',
                          flexShrink: 0 
                        }} 
                      />
                      <span 
                        style={{ 
                          fontSize: '14px', 
                          fontWeight: 500, 
                          fontFamily: 'var(--font-display)', 
                          transition: 'color 0.2s',
                          color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          flexGrow: 1
                        }}
                      >
                        {stream.title}
                      </span>
                      {isActive && isPlaying && (
                        <div className="visualizer-wave" style={{ padding: 0, height: '16px', display: 'flex', gap: '3px', alignItems: 'flex-end', marginLeft: 'auto', flexShrink: 0 }}>
                          <div className="visualizer-bar" style={{ width: '3px' }}></div>
                          <div className="visualizer-bar" style={{ width: '3px' }}></div>
                          <div className="visualizer-bar" style={{ width: '3px' }}></div>
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

      <div style={{ height: '1px', backgroundColor: 'var(--color-whisper-border)', width: '100%' }} />

      {/* Section 3: Custom YouTube Link */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 className="uppercase tracking-wider text-text-secondary font-medium" style={{ fontSize: '14px', fontFamily: 'var(--font-display)', margin: 0 }}>
          Custom YouTube Link
        </h3>
        <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
          <label htmlFor="custom-stream-input" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
            Custom YouTube URL
          </label>
          <input
            id="custom-stream-input"
            name="custom-stream-url"
            type="text"
            placeholder="Paste YouTube Video/Playlist URL..."
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            style={{ 
              flexGrow: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--color-whisper-border)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: 'var(--color-text-primary)',
              fontSize: '16px', 
              fontFamily: 'var(--font-display)',
              outline: 'none',
              minWidth: 0
            }}
          />
          <button 
            type="submit" 
            style={{ 
              backgroundColor: 'var(--color-primary)', 
              color: 'var(--color-canvas-base)', 
              fontWeight: 600, 
              padding: '8px 16px', 
              borderRadius: '8px', 
              transition: 'all 0.2s', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '14px', 
              fontFamily: 'var(--font-display)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              whiteSpace: 'nowrap' 
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default LofiPlayer
