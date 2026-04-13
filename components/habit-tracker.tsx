"use client"

import { useState, useEffect } from "react"
import { Target, Sparkles } from "lucide-react"
import { HabitCard } from "./habit-card"
import { AddHabitForm } from "./add-habit-form"
import { EmptyState } from "./empty-state"
import {
  type Habit,
  getHabits,
  addHabit,
  deleteHabit,
  toggleHabitCompletion,
  getLast7Days,
} from "@/lib/habit-store"

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setHabits(getHabits())
    setIsLoaded(true)
  }, [])

  const handleAddHabit = (name: string) => {
    const newHabit = addHabit(name)
    setHabits((prev) => [...prev, newHabit])
  }

  const handleDeleteHabit = (id: string) => {
    deleteHabit(id)
    setHabits((prev) => prev.filter((h) => h.id !== id))
  }

  const handleToggle = (habitId: string, date: string) => {
    toggleHabitCompletion(habitId, date)
    setHabits(getHabits())
  }

  // Calculate overall stats
  const days = getLast7Days()
  const totalCompletions = habits.reduce((acc, habit) => {
    return acc + days.filter((day) => habit.completedDates.includes(day)).length
  }, 0)
  const totalPossible = habits.length * 7
  const overallProgress = totalPossible > 0 ? Math.round((totalCompletions / totalPossible) * 100) : 0

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Habit Tracker</h1>
                <p className="text-sm text-muted-foreground">Build better routines</p>
              </div>
            </div>
            {habits.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  {overallProgress}% this week
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Add Habit Form */}
          <AddHabitForm onAdd={handleAddHabit} />

          {/* Habits List */}
          {habits.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={handleToggle}
                  onDelete={handleDeleteHabit}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Track your habits daily. Small steps lead to big changes.
          </p>
        </div>
      </footer>
    </div>
  )
}
