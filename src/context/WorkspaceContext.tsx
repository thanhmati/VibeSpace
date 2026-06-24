import React, { createContext, useContext, useState, type ReactNode } from 'react'
import { BACKGROUND_PRESETS } from '../data/mockData'
import { useLocalStorage } from '../hooks/useLocalStorage'

// PanelType now tracks which non-audio panel is visible (music/mixer are independent)
export type PanelType = 'todo' | 'background' | null
export type TimerSessionType = 'focus' | 'short' | 'long'

interface WorkspaceContextProps {
  // Non-audio floating panels (mutually exclusive)
  activePanel: PanelType
  setActivePanel: (panel: PanelType) => void
  // Audio panel visibility (independent — both can be open simultaneously)
  musicPanelOpen: boolean
  setMusicPanelOpen: (open: boolean) => void
  mixerPanelOpen: boolean
  setMixerPanelOpen: (open: boolean) => void
  backgroundImage: string
  setBackgroundImage: (url: string) => void
  overlayOpacity: number
  setOverlayOpacity: (opacity: number) => void
  isMuted: boolean
  setIsMuted: (muted: boolean) => void
  activeTimerSession: TimerSessionType
  setActiveTimerSession: (session: TimerSessionType) => void
  isTimerRunning: boolean
  setIsTimerRunning: (running: boolean) => void
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(undefined)

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePanel, setActivePanel] = useState<PanelType>(null)
  const [musicPanelOpen, setMusicPanelOpen] = useState(false)
  const [mixerPanelOpen, setMixerPanelOpen] = useState(false)
  const [backgroundImage, setBackgroundImage] = useLocalStorage<string>('workspace-bg', BACKGROUND_PRESETS[0].url)
  const [overlayOpacity, setOverlayOpacity] = useLocalStorage<number>('workspace-opacity', 0.2)
  const [isMuted, setIsMuted] = useLocalStorage<boolean>('workspace-muted', false)
  const [activeTimerSession, setActiveTimerSession] = useState<TimerSessionType>('focus')
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

  return (
    <WorkspaceContext.Provider
      value={{
        activePanel,
        setActivePanel,
        musicPanelOpen,
        setMusicPanelOpen,
        mixerPanelOpen,
        setMixerPanelOpen,
        backgroundImage,
        setBackgroundImage,
        overlayOpacity,
        setOverlayOpacity,
        isMuted,
        setIsMuted,
        activeTimerSession,
        setActiveTimerSession,
        isTimerRunning,
        setIsTimerRunning,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext)
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider')
  }
  return context
}
