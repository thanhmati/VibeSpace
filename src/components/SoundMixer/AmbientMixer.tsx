import React from 'react'
import { X, Droplet, CloudLightning, Wind, Trees, Flame, Waves, Coffee, Sliders } from 'lucide-react'
import { AMBIENT_SOUNDS } from '../../data/mockData'
import { useWorkspace } from '../../context/WorkspaceContext'
import { useAudioMixer } from '../../hooks/useAudioMixer'

// Map iconName from mock data to Lucide Icons
const iconMap: Record<string, React.ComponentType<any>> = {
  rain: Droplet,
  thunder: CloudLightning,
  wind: Wind,
  forest: Trees,
  campfire: Flame,
  ocean: Waves,
  cafe: Coffee
}

export const AmbientMixer: React.FC = () => {
  const { isMuted, setIsMuted, setActivePanel } = useWorkspace()

  // Integrate multi-channel audio loop engine
  const {
    volumes,
    activeStates,
    setVolume,
    toggleSoundActive
  } = useAudioMixer(isMuted)

  const handleVolumeSliderChange = (key: string, val: number) => {
    setVolume(key, val)
  }

  const handleMasterMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div 
      className="glass-panel mixer-widget"
      style={{ 
        width: '400px', 
        borderRadius: '20px', 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="font-h2 text-h2 text-text-primary font-bold" style={{ margin: 0 }}>
          Ambient Sounds
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

      {/* Master Mute Row */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '1px solid var(--color-whisper-border)', 
          paddingBottom: '16px' 
        }}
      >
        <span style={{ fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 400, fontFamily: 'var(--font-display)' }}>
          Mute All Sounds
        </span>
        <label className="switch-toggle">
          <input 
            type="checkbox" 
            checked={isMuted} 
            onChange={handleMasterMute} 
          />
          <span className="switch-slider"></span>
        </label>
      </div>

      {/* Mixer Rows */}
      <div 
        className="mixer-rows-container scroller" 
        style={{ 
          maxHeight: '280px', 
          overflowY: 'auto', 
          paddingRight: '4px', 
          gap: '20px', 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        {AMBIENT_SOUNDS.map((sound) => {
          const active = (activeStates[sound.key] ?? false) && !isMuted
          const volume = volumes[sound.key] ?? sound.defaultVolume
          const IconComponent = iconMap[sound.iconName] || Sliders
          
          return (
            <div 
              key={sound.key} 
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                opacity: active ? 1 : 0.5, 
                transition: 'opacity 0.2s ease' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', 
                    transition: 'color 0.2s' 
                  }}
                >
                  <IconComponent 
                    size={20} 
                    style={{ color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)', transition: 'color 0.2s' }}
                  />
                  <span style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'var(--font-display)' }}>
                    {sound.name}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span 
                    className="font-mono text-text-secondary text-right" 
                    style={{ fontSize: '12px', width: '32px', fontFamily: 'var(--font-mono)' }}
                  >
                    {active ? `${volume}%` : '0%'}
                  </span>
                  
                  {/* Toggle checkbox on right */}
                  <label className="switch-toggle sm">
                    <input 
                      type="checkbox" 
                      checked={activeStates[sound.key] ?? false} 
                      onChange={() => toggleSoundActive(sound.key)} 
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
              </div>
              
              <input
                className={`custom-slider ${active ? 'slider-active' : ''}`}
                max="100"
                min="0"
                type="range"
                value={active ? volume : 0}
                onChange={(e) => handleVolumeSliderChange(sound.key, parseInt(e.target.value, 10))}
                disabled={isMuted || !(activeStates[sound.key] ?? false)}
                style={{
                  background: active 
                    ? `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${volume}%, rgba(255, 255, 255, 0.1) ${volume}%, rgba(255, 255, 255, 0.1) 100%)`
                    : 'rgba(255, 255, 255, 0.1)',
                  cursor: active ? 'pointer' : 'not-allowed'
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AmbientMixer
