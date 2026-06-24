import { useState } from 'react'
import { Play, RotateCcw, Music, Volume2, CheckSquare, Image as ImageIcon } from 'lucide-react'

function App() {
  const [activePanel, setActivePanel] = useState<'music' | 'mixer' | 'todo' | 'background' | null>(null)

  const togglePanel = (panel: 'music' | 'mixer' | 'todo' | 'background') => {
    setActivePanel(activePanel === panel ? null : panel)
  }

  return (
    <div className="workspace-container">
      {/* Background Layer with overlay */}
      <div className="background-overlay" style={{ opacity: 0.35 }}></div>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Centered Zen Pomodoro Clock */}
        <div className="pomodoro-container">
          <div className="pomodoro-ring-outer">
            <div className="pomodoro-ring-inner">
              <span className="timer-display">25:00</span>
              <span className="timer-status">Focus Session</span>
            </div>
          </div>
          <div className="timer-controls">
            <button className="glass-button primary">
              <Play size={16} /> Start
            </button>
            <button className="glass-button">
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>
      </main>

      {/* Floating Control Panels */}
      {activePanel === 'music' && (
        <div className="glass-panel floating-widget music-widget">
          <h3>Lofi Player</h3>
          <p className="subtitle">Choose a stream or paste your own</p>
          <div className="widget-content">
            <input type="text" className="glass-input" placeholder="YouTube URL..." />
            <button className="glass-button primary" style={{ width: '100%', marginTop: '12px' }}>
              Load Video
            </button>
          </div>
        </div>
      )}

      {activePanel === 'mixer' && (
        <div className="glass-panel floating-widget mixer-widget">
          <h3>Ambient Sound Mixer</h3>
          <p className="subtitle">Mix your own soundscapes</p>
          <div className="widget-content scroller" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {['Rain', 'Campfire', 'Wind', 'Waves', 'Coffee Shop'].map((sound) => (
              <div key={sound} className="mixer-row" style={{ display: 'flex', alignItems: 'center', margin: '12px 0' }}>
                <span style={{ flex: 1 }}>{sound}</span>
                <input type="range" className="volume-slider" min="0" max="100" defaultValue="50" />
              </div>
            ))}
          </div>
        </div>
      )}

      {activePanel === 'todo' && (
        <div className="glass-panel floating-widget todo-widget">
          <h3>Daily Todo List</h3>
          <p className="subtitle">Keep track of tasks</p>
          <div className="widget-content">
            <div className="todo-input-group" style={{ display: 'flex', gap: '8px' }}>
              <input type="text" className="glass-input" placeholder="Add task..." style={{ flex: 1 }} />
              <button className="glass-button primary">Add</button>
            </div>
            <div className="todo-list scroller" style={{ maxHeight: '150px', overflowY: 'auto', marginTop: '12px' }}>
              <div style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                Placeholder Task
              </div>
            </div>
          </div>
        </div>
      )}

      {activePanel === 'background' && (
        <div className="glass-panel floating-widget background-widget">
          <h3>Background Switcher</h3>
          <p className="subtitle">Choose a background style</p>
          <div className="widget-content">
            <input type="text" className="glass-input" placeholder="Image URL..." />
            <div className="preset-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '12px' }}>
              <button className="glass-button">Forest</button>
              <button className="glass-button">Ocean</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons (FABs) at Bottom */}
      <footer className="footer-controls">
        <button 
          className={`fab-button ${activePanel === 'music' ? 'active' : ''}`}
          onClick={() => togglePanel('music')}
          title="Lofi Music"
        >
          <Music size={20} />
        </button>
        <button 
          className={`fab-button ${activePanel === 'mixer' ? 'active' : ''}`}
          onClick={() => togglePanel('mixer')}
          title="Ambient Mixer"
        >
          <Volume2 size={20} />
        </button>
        <button 
          className={`fab-button ${activePanel === 'todo' ? 'active' : ''}`}
          onClick={() => togglePanel('todo')}
          title="Todo List"
        >
          <CheckSquare size={20} />
        </button>
        <button 
          className={`fab-button ${activePanel === 'background' ? 'active' : ''}`}
          onClick={() => togglePanel('background')}
          title="Change Vibe"
        >
          <ImageIcon size={20} />
        </button>
      </footer>
    </div>
  )
}

export default App
