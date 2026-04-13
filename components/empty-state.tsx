"use client"

import { CalendarDays, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"

export function EmptyState() {
  return (
    <Card className="p-8 bg-card border-border border-dashed">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <CalendarDays className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-card-foreground mb-2">
          No habits yet
        </h2>
        <p className="text-muted-foreground max-w-sm mb-6">
          Start building better routines by adding your first habit. 
          Track your progress over the last 7 days.
        </p>
        <div className="flex items-center gap-2 text-sm text-primary font-medium">
          <Sparkles className="h-4 w-4" />
          <span>Click the button above to get started</span>
        </div>
      </div>
    </Card>
  )
}
