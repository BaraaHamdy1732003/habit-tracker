export interface Habit {
  id: string
  name: string
  completedDates: string[] // Array of date strings in YYYY-MM-DD format
  createdAt: string
}

const STORAGE_KEY = 'habit-tracker-habits'

export function getHabits(): Habit[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function saveHabits(habits: Habit[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
}

export function addHabit(name: string): Habit {
  const habits = getHabits()
  const newHabit: Habit = {
    id: crypto.randomUUID(),
    name: name.trim(),
    completedDates: [],
    createdAt: new Date().toISOString(),
  }
  habits.push(newHabit)
  saveHabits(habits)
  return newHabit
}

export function deleteHabit(id: string): void {
  const habits = getHabits()
  const filtered = habits.filter((h) => h.id !== id)
  saveHabits(filtered)
}

export function toggleHabitCompletion(habitId: string, date: string): void {
  const habits = getHabits()
  const habit = habits.find((h) => h.id === habitId)
  if (!habit) return

  const index = habit.completedDates.indexOf(date)
  if (index === -1) {
    habit.completedDates.push(date)
  } else {
    habit.completedDates.splice(index, 1)
  }
  saveHabits(habits)
}

export function getLast7Days(): string[] {
  const days: string[] = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    days.push(date.toISOString().split('T')[0])
  }
  return days
}

export function formatDayLabel(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const diffDays = Math.round((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export function calculateProgress(habit: Habit, days: string[]): number {
  const completed = days.filter((day) => habit.completedDates.includes(day)).length
  return Math.round((completed / days.length) * 100)
}
