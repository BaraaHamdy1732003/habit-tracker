"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface AddHabitFormProps {
  onAdd: (name: string) => void
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [name, setName] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAdd(name.trim())
      setName("")
      setIsExpanded(false)
    }
  }

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add New Habit
      </Button>
    )
  }

  return (
    <Card className="p-4 bg-card border-border shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter habit name (e.g., Exercise, Read, Meditate)"
          className="flex-1 h-12 text-base bg-background border-input placeholder:text-muted-foreground focus-visible:ring-primary"
          autoFocus
        />
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={!name.trim()}
            className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold disabled:opacity-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsExpanded(false)
              setName("")
            }}
            className="h-12 px-4 border-border text-foreground hover:bg-muted"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
