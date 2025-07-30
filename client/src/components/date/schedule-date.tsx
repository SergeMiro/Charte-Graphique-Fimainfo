"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Since chrono-node is not installed, we'll create a simple date parser function
function parseDate(text: string): Date | null {
  // Simple parsing for common date formats in French and English
  if (!text) return null;
  
  // Handle "Dans X jours" / "In X days" format
  const inDaysMatch = text.match(/(dans|in)\s+(\d+)\s+(jours?|days?)/i);
  if (inDaysMatch) {
    const days = parseInt(inDaysMatch[2], 10);
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
  
  // Handle "Demain" / "Tomorrow" 
  if (text.toLowerCase() === "demain" || text.toLowerCase() === "tomorrow") {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }
  
  // Handle "Semaine prochaine" / "Next week"
  if (text.toLowerCase() === "semaine prochaine" || 
      text.toLowerCase() === "la semaine prochaine" || 
      text.toLowerCase() === "next week") {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }
  
  // Handle "Aujourd'hui" / "Today"
  if (text.toLowerCase() === "aujourd'hui" || 
      text.toLowerCase() === "aujourd hui" || 
      text.toLowerCase() === "today") {
    return new Date();
  }
  
  // Try standard date parsing as fallback
  const parsedDate = new Date(text);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function ScheduleDate() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("Dans 2 jours")
  const [date, setDate] = React.useState<Date | undefined>(
    parseDate(value) || undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="schedule-date" className="px-1">
        Date planifiée
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="schedule-date"
          value={value}
          placeholder="Demain ou semaine prochaine"
          className="bg-background pr-10"
          onChange={(e) => {
            setValue(e.target.value)
            const date = parseDate(e.target.value)
            if (date) {
              setDate(date)
              setMonth(date)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Sélectionner une date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date)
                setValue(formatDate(date))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-muted-foreground px-1 text-sm">
        Votre publication sera publiée le{" "}
        <span className="font-medium">{formatDate(date)}</span>.
      </div>
    </div>
  )
}
