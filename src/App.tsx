import { Settings, Sprout, Music, Sliders, ClipboardList, Palette } from 'lucide-react'
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext'
import { PomodoroTimer } from './components/Pomodoro/PomodoroTimer'
import { LofiPlayer } from './components/MusicPlayer/LofiPlayer'
import { AmbientMixer } from './components/SoundMixer/AmbientMixer'
import { TodoWidget } from './components/TodoList/TodoWidget'
import { BackgroundSwitcher } from './components/Background/BackgroundSwitcher'

function WorkspaceContent() {
  const {
    activePanel,
    setActivePanel,
    backgroundImage,
    overlayOpacity
  } = useWorkspace()

  const handlePanelToggle = (panel: 'music' | 'mixer' | 'todo' | 'background') => {
    setActivePanel(activePanel === panel ? null : panel)
  }

  return (
    <div className="workspace-container">
      {/* Background Image Layer */}
      <div 
        className="workspace-bg"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      {/* Background Dark Overlay for text readability */}
      <div 
        className="workspace-overlay"
        style={{ opacity: overlayOpacity }}
      />

      {/* Top Navbar */}
      <nav className="top-nav">
        <div className="nav-brand">VibeSpace</div>
        <div className="nav-actions">
          <button className="nav-icon-btn" title="System Settings">
            <Settings size={20} />
          </button>
          <button className="nav-icon-btn" title="Zen Ecology">
            <Sprout size={20} />
          </button>
          <img 
            className="profile-avatar" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ6LpDZxef7WQ34mcgR__w024LcApU7lqDosE_WJSCcHjv0ElCDNnP2_kuo38BCXl_-pY0LHdHs-r12fHeR8Gsbr37XTVJmVkTaSySXhBp1DmhP1re8NGtUFURXjEUH-NrDFlsO54dV2-vlOlnC_Rih7ZYDBlCy4U58O-0Lg3N-i2Yg3bO2z5JnU9btn3DoE7UPI6eWBwA7nPaGL6GtrpfGsGYT4lYSd0n9pttvrSYlLaz5BUc4It0uz_1JQpX5_uzoQ27p5thjvc" 
            alt="Profile Avatar"
          />
        </div>
      </nav>

      {/* Main Area */}
      <main className="main-workspace">
        {/* Center Clock */}
        <PomodoroTimer />

        {/* Absolute Floating Panels */}
        {activePanel === 'music' && <LofiPlayer />}
        {activePanel === 'mixer' && <AmbientMixer />}
        {activePanel === 'todo' && <TodoWidget />}
        {activePanel === 'background' && <BackgroundSwitcher />}
      </main>

      {/* Bottom Dock Navigation */}
      <nav className="dock-nav glass-panel">
        <button 
          className={`dock-btn ${activePanel === 'music' ? 'active' : ''}`}
          onClick={() => handlePanelToggle('music')}
          title="Lofi Music"
        >
          <Music size={22} />
        </button>
        <button 
          className={`dock-btn ${activePanel === 'mixer' ? 'active' : ''}`}
          onClick={() => handlePanelToggle('mixer')}
          title="Atmosphere Sounds"
        >
          <Sliders size={22} />
        </button>
        <button 
          className={`dock-btn ${activePanel === 'todo' ? 'active' : ''}`}
          onClick={() => handlePanelToggle('todo')}
          title="Tasks checklist"
        >
          <ClipboardList size={22} />
        </button>
        <button 
          className={`dock-btn ${activePanel === 'background' ? 'active' : ''}`}
          onClick={() => handlePanelToggle('background')}
          title="Vibe Theme"
        >
          <Palette size={22} />
        </button>
      </nav>
    </div>
  )
}

function App() {
  return (
    <WorkspaceProvider>
      <WorkspaceContent />
    </WorkspaceProvider>
  )
}

export default App
