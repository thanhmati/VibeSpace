import React, { useState, useEffect } from 'react'
import { ClipboardList, Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react'
import { INITIAL_TODOS } from '../../data/mockData'
import { useLocalStorage } from '../../hooks/useLocalStorage'

interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

export const TodoWidget: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>('vibe-space-todos', INITIAL_TODOS)
  const [lastOpenedDate, setLastOpenedDate] = useLocalStorage<string>('vibe-space-last-date', '')
  const [showInput, setShowInput] = useState(false)
  const [inputText, setInputText] = useState('')

  // Daily Reset Logic
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD in local timezone
    
    if (lastOpenedDate && lastOpenedDate !== today) {
      // It's a new day! Clear the checklist.
      setTodos([])
    }
    
    setLastOpenedDate(today)
  }, [])

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return
    
    const newTodo: TodoItem = {
      id: Math.random().toString(),
      text: inputText,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos((prev) => [...prev, newTodo])
    setInputText('')
    setShowInput(false)
  }

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const completedCount = todos.filter((t) => t.completed).length
  const totalCount = todos.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="glass-panel todo-widget">
      {/* Todo Header */}
      <div className="widget-title-row">
        <h3>
          <ClipboardList size={18} className="text-primary" />
          Tasks
        </h3>
        <button
          className={`nav-icon-btn ${showInput ? 'text-primary' : ''}`}
          onClick={() => setShowInput(!showInput)}
          title="Add Task"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Toggle Input Field */}
      {showInput && (
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px', marginBottom: '16px', width: '100%', boxSizing: 'border-box' }}>
          <label htmlFor="new-task-input" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
            New Task Text
          </label>
          <input
            id="new-task-input"
            name="new-task-text"
            type="text"
            placeholder="What needs to be done?"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            autoFocus
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
      )}

      {/* Todo List Scroller */}
      <div className="todo-scroller scroller">
        {todos.length === 0 ? (
          <p className="subtitle" style={{ textAlign: 'center', margin: '24px 0' }}>
            No tasks today. Add one!
          </p>
        ) : (
          <ul className="todo-list-ul">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item-li group">
                <button
                  className={`todo-check-btn ${todo.completed ? 'checked' : 'unchecked'}`}
                  onClick={() => handleToggle(todo.id)}
                >
                  {todo.completed ? <CheckCircle2 size={16} fill="currentColor" /> : <Circle size={16} />}
                </button>
                <span className={`todo-item-text ${todo.completed ? 'completed' : 'active'}`}>
                  {todo.text}
                </span>
                <button
                  className="todo-delete-btn"
                  onClick={() => handleDelete(todo.id)}
                  title="Delete Task"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Todo Progress */}
      {totalCount > 0 && (
        <div className="todo-progress-container">
          <span>{completedCount} of {totalCount} completed</span>
          <span>{progressPercent}%</span>
        </div>
      )}
    </div>
  )
}
export default TodoWidget
