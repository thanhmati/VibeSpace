import React, { createContext, useContext, useState, type ReactNode } from 'react'
import { BACKGROUND_PRESETS } from '../data/mockData'
import { useLocalStorage } from '../hooks/useLocalStorage'

export type PanelType = 'music' | 'mixer' | 'todo' | 'background' | null
export type TimerSessionType = 'focus' | 'short' | 'long'

interface WorkspaceContextProps {
  activePanel: PanelType
  setActivePanel: (panel: PanelType) => void
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
        backgroundImage,
        setBackgroundImage,
        overlayOpacity,
        setOverlayOpacity,
        isMuted,
        setIsMuted,
        activeTimerSession,
        setActiveTimerSession,
        isTimerRunning,
        setIsTimerRunning
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
