import React, { useState } from 'react'
import { X, CheckCircle2 } from 'lucide-react'
import { BACKGROUND_PRESETS, type BackgroundPreset } from '../../data/mockData'
import { useWorkspace } from '../../context/WorkspaceContext'

interface BackgroundSwitcherProps {
  onBackgroundChange?: (url: string) => void
  onOpacityChange?: (opacity: number) => void
}

export const BackgroundSwitcher: React.FC<BackgroundSwitcherProps> = ({
  onBackgroundChange,
  onOpacityChange
}) => {
  const {
    backgroundImage,
    setBackgroundImage,
    overlayOpacity,
    setOverlayOpacity,
    setActivePanel
  } = useWorkspace()

  const [customUrl, setCustomUrl] = useState('')

  const handlePresetSelect = (preset: BackgroundPreset) => {
    if (onBackgroundChange) {
      onBackgroundChange(preset.url)
    } else {
      setBackgroundImage(preset.url)
    }
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customUrl.trim()) return
    if (onBackgroundChange) {
      onBackgroundChange(customUrl)
    } else {
      setBackgroundImage(customUrl)
    }
    setCustomUrl('')
  }

  const handleOpacitySlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = parseFloat(e.target.value)
    const val = rawVal / 100
    if (onOpacityChange) {
      onOpacityChange(val)
    } else {
      setOverlayOpacity(val)
    }
  }

  const sliderValue = Math.round(overlayOpacity * 100)

  return (
    <div 
      className="glass-panel background-widget" 
      style={{ 
        width: '360px', 
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
        <h2 className="font-h2 text-h2 text-slate-50 font-bold tracking-tight" style={{ margin: 0 }}>
          Customize Vibe
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

      {/* Section 1: Curated Scenes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 
          className="uppercase tracking-wider text-slate-400 font-medium" 
          style={{ fontSize: '14px', fontFamily: 'var(--font-display)', lineHeight: '1.4', margin: 0 }}
        >
          Curated Scenes
        </h3>
        <div className="preset-grid-stitch">
          {BACKGROUND_PRESETS.map((preset) => {
            const isActive = backgroundImage === preset.url
            return (
              <button
                key={preset.id}
                className={`preset-thumb-btn-stitch ${isActive ? 'active' : ''}`}
                onClick={() => handlePresetSelect(preset)}
              >
                <img className="preset-thumb-img-stitch" src={preset.url} alt="" />
                
                {/* Active check overlay or inactive dark hover overlay */}
                {isActive ? (
                  <div 
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      zIndex: 10 
                    }}
                  >
                    <CheckCircle2 size={24} fill="var(--color-primary)" color="var(--color-canvas-base)" />
                  </div>
                ) : (
                  <div 
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                      transition: 'background-color 0.3s' 
                    }}
                    className="hover-overlay-stitch"
                  />
                )}
                
                <div className="preset-overlay-stitch">
                  <span className="preset-name-stitch">{preset.name}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Section 2: Custom Background */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 
          className="uppercase tracking-wider text-slate-400 font-medium" 
          style={{ fontSize: '14px', fontFamily: 'var(--font-display)', lineHeight: '1.4', margin: 0 }}
        >
          Custom Background
        </h3>
        <form onSubmit={handleCustomSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="custom-bg-input" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
            Custom Background URL
          </label>
          <input
            id="custom-bg-input"
            name="custom-bg-url"
            type="text"
            placeholder="Paste custom image URL..."
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            style={{ 
              width: '100%',
              boxSizing: 'border-box',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--color-whisper-border)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: 'var(--color-text-primary)',
              fontSize: '16px', 
              fontFamily: 'var(--font-display)',
              outline: 'none'
            }}
          />
          <button 
            type="submit" 
            style={{ 
              width: '100%',
              backgroundColor: 'var(--color-primary)', 
              color: 'var(--color-canvas-base)', 
              fontWeight: 'bold', 
              padding: '12px 16px', 
              borderRadius: '8px', 
              transition: 'all 0.2s', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '16px', 
              fontFamily: 'var(--font-display)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            Apply
          </button>
        </form>
      </div>

      {/* Section 3: Card Opacity Settings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--color-whisper-border)', paddingTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 
            className="uppercase tracking-wider text-slate-400 font-medium" 
            style={{ fontSize: '14px', fontFamily: 'var(--font-display)', lineHeight: '1.4', margin: 0 }}
          >
            Card Opacity
          </h3>
          <span 
            className="font-mono text-text-secondary" 
            style={{ fontSize: '12px', fontWeight: 400 }}
          >
            {sliderValue}%
          </span>
        </div>
        <div style={{ width: '100%', padding: '8px 0', display: 'flex', alignItems: 'center' }}>
          <input
            className={`custom-slider ${sliderValue > 0 ? 'slider-active' : ''}`}
            max="100"
            min="10"
            step="5"
            type="range"
            value={sliderValue}
            onChange={handleOpacitySlider}
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${sliderValue}%, rgba(255, 255, 255, 0.1) ${sliderValue}%, rgba(255, 255, 255, 0.1) 100%)`
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default BackgroundSwitcher
