"use client"

import { Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { type Habit, getLast7Days, formatDayLabel, calculateProgress } from "@/lib/habit-store"

interface HabitCardProps {
  habit: Habit
  onToggle: (habitId: string, date: string) => void
  onDelete: (habitId: string) => void
}

export function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  const days = getLast7Days()
  const progress = calculateProgress(habit, days)

  return (
    <Card className="p-6 bg-card border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-card-foreground truncate">
              {habit.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {progress}% completed this week
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(habit.id)}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
            aria-label={`Delete ${habit.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Day Checkboxes */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const isCompleted = habit.completedDates.includes(day)
            const dayLabel = formatDayLabel(day)
            const isToday = dayLabel === "Today"
            
            return (
              <button
                key={day}
                onClick={() => onToggle(habit.id, day)}
                className={`
                  flex flex-col items-center gap-1 p-2 rounded-xl transition-all
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                  ${isToday ? "bg-primary/10 ring-1 ring-primary/20" : ""}
                  hover:bg-accent/50
                `}
                aria-label={`${isCompleted ? "Unmark" : "Mark"} ${habit.name} as complete for ${dayLabel}`}
              >
                <span className={`
                  text-xs font-medium
                  ${isToday ? "text-primary" : "text-muted-foreground"}
                `}>
                  {dayLabel}
                </span>
                <div
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center transition-all
                    ${isCompleted 
                      ? "bg-success text-success-foreground shadow-sm" 
                      : "bg-muted/50 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50"
                    }
                  `}
                >
                  {isCompleted && <Check className="h-4 w-4" strokeWidth={3} />}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
