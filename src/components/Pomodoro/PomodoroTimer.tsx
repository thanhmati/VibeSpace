import React, { useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import {
  useWorkspace,
  type TimerSessionType,
} from "../../context/WorkspaceContext";
import { usePrecisionTimer } from "../../hooks/usePrecisionTimer";
import chimeSound from "../../assets/audio/chime.mp3";

const SESSION_TIMES: Record<TimerSessionType, number> = {
  focus: 1500, // 25 minutes
  short: 300, // 5 minutes
  long: 900, // 15 minutes
};

const SESSION_LABELS: Record<TimerSessionType, string> = {
  focus: "Flow State",
  short: "Short Break",
  long: "Long Break",
};

export const PomodoroTimer: React.FC = () => {
  const { activeTimerSession, setActiveTimerSession, setIsTimerRunning } =
    useWorkspace();

  const currentDuration = SESSION_TIMES[activeTimerSession];

  // Title flash interval ref
  const titleIntervalRef = useRef<number | null>(null);

  // Clean up title flash on unmount
  useEffect(() => {
    return () => {
      if (titleIntervalRef.current) {
        window.clearInterval(titleIntervalRef.current);
      }
    };
  }, []);

  // Play the local chime sound 3 times sequentially
  const playGentleChime = () => {
    try {
      const playSingle = () => {
        const audio = new Audio(chimeSound);
        audio.volume = 0.5;
        audio.play().catch((err) => {
          console.warn("Chime playback failed:", err);
        });
      };

      // Play 3 times with 2-second interval
      playSingle();
      setTimeout(playSingle, 2000);
      setTimeout(playSingle, 4000);
    } catch (err) {
      console.warn("Chime playback failed:", err);
    }
  };

  const handleSessionComplete = () => {
    // Play chime sound
    playGentleChime();

    // Flash browser tab title
    if (titleIntervalRef.current) {
      window.clearInterval(titleIntervalRef.current);
    }

    let isAlert = true;
    document.title = "⏰ Time's Up!";
    titleIntervalRef.current = window.setInterval(() => {
      document.title = isAlert ? "VibeSpace - Zen Focus" : "⏰ Time's Up!";
      isAlert = !isAlert;
    }, 1000);

    // Automatically stop running state in workspace
    setIsTimerRunning(false);
  };

  const { timeLeft, isRunning, start, pause, reset } = usePrecisionTimer({
    initialDuration: currentDuration,
    onComplete: handleSessionComplete,
  });

  // Clear tab title flashing and sync status when user interacts/resets
  const clearTitleFlashing = () => {
    if (titleIntervalRef.current) {
      window.clearInterval(titleIntervalRef.current);
      titleIntervalRef.current = null;
    }
    document.title = "VibeSpace - Zen Focus Space";
  };

  // Handle active session changes from tabs
  const handleTabChange = (session: TimerSessionType) => {
    clearTitleFlashing();
    setActiveTimerSession(session);
    setIsTimerRunning(false);
    reset(SESSION_TIMES[session]);
  };

  const handleStartPause = () => {
    clearTitleFlashing();
    if (isRunning) {
      pause();
      setIsTimerRunning(false);
    } else {
      start();
      setIsTimerRunning(true);
    }
  };

  const handleResetClick = () => {
    clearTitleFlashing();
    reset(currentDuration);
    setIsTimerRunning(false);
  };

  const handleSkipClick = () => {
    clearTitleFlashing();
    // Cycle Focus -> Short Break -> Long Break -> Focus
    let nextSession: TimerSessionType = "focus";
    if (activeTimerSession === "focus") {
      nextSession = "short";
    } else if (activeTimerSession === "short") {
      nextSession = "long";
    }
    handleTabChange(nextSession);
  };

  // Circular progress calculations (Radius = 140, Circumference = 880)
  const circumference = 880;
  const progressRatio = timeLeft / currentDuration;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`pomodoro-wrapper ${isRunning ? "active-session" : ""}`}>
      {/* Session Tabs */}
      <div className="timer-tabs glass-panel">
        {(["focus", "short", "long"] as TimerSessionType[]).map((session) => (
          <button
            key={session}
            className={`timer-tab-btn ${activeTimerSession === session ? "active" : ""}`}
            onClick={() => handleTabChange(session)}
          >
            {session === "focus"
              ? "Focus"
              : session === "short"
                ? "Short Break"
                : "Long Break"}
          </button>
        ))}
      </div>

      {/* Clock Face SVG Circle Display */}
      <div className="timer-ring-container glass-panel">
        <svg className="progress-svg" viewBox="0 0 300 300">
          <circle
            className="text-whisper-border"
            cx="150"
            cy="150"
            fill="none"
            r="140"
            stroke="currentColor"
            strokeWidth="4"
          />
          <circle
            className="text-primary timer-ring"
            cx="150"
            cy="150"
            fill="none"
            r="140"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="4"
            style={{ strokeDashoffset }}
          />
        </svg>
        <div className="timer-digits-wrapper">
          <div className="timer-digits">{formatTime(timeLeft)}</div>
          <div className="timer-label">
            {SESSION_LABELS[activeTimerSession]}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="timer-control-row">
        <button
          className="timer-btn-round glass-panel"
          onClick={handleResetClick}
          title="Reset Timer"
        >
          <RotateCcw size={20} />
        </button>
        <button className="timer-btn-primary" onClick={handleStartPause}>
          {isRunning ? (
            <>
              <Pause size={18} fill="currentColor" /> Pause
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" /> Start
            </>
          )}
        </button>
        <button
          className="timer-btn-round glass-panel"
          onClick={handleSkipClick}
          title="Skip Session"
        >
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
};
export default PomodoroTimer;
