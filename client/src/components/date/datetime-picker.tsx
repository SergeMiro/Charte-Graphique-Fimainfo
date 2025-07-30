"use client"

import * as React from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DateTimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  label?: string
}

export function DateTimePicker({ date, setDate, label }: DateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date | undefined>(date)
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)
  const [isTimeOpen, setIsTimeOpen] = React.useState(false)

  // Create hours and minutes options
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

  // Update parent when our state changes
  React.useEffect(() => {
    setDate(selectedDateTime)
  }, [selectedDateTime, setDate])

  // Update our state when parent date changes
  React.useEffect(() => {
    setSelectedDateTime(date)
  }, [date])

  function handleSelectDate(date: Date | undefined) {
    if (!date) return
    
    const newDateTime = new Date(date)
    if (selectedDateTime) {
      // Keep the time from the existing selection
      newDateTime.setHours(selectedDateTime.getHours())
      newDateTime.setMinutes(selectedDateTime.getMinutes())
    }
    
    setSelectedDateTime(newDateTime)
    setIsCalendarOpen(false)
  }

  function handleSelectHour(hour: string) {
    if (!selectedDateTime) return
    
    const newDateTime = new Date(selectedDateTime)
    newDateTime.setHours(parseInt(hour))
    setSelectedDateTime(newDateTime)
  }

  function handleSelectMinute(minute: string) {
    if (!selectedDateTime) return
    
    const newDateTime = new Date(selectedDateTime)
    newDateTime.setMinutes(parseInt(minute))
    setSelectedDateTime(newDateTime)
  }

  return (
    <div className="flex flex-col gap-3">
      {label && <Label className="px-1">{label}</Label>}
      <div className="flex gap-2">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDateTime && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDateTime ? (
                format(selectedDateTime, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDateTime}
              onSelect={handleSelectDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Popover open={isTimeOpen} onOpenChange={setIsTimeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                !selectedDateTime && "text-muted-foreground"
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              {selectedDateTime ? (
                format(selectedDateTime, "HH:mm")
              ) : (
                <span>Pick a time</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4">
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <Label>Hour</Label>
                <Select
                  value={selectedDateTime ? String(selectedDateTime.getHours()) : ""}
                  onValueChange={handleSelectHour}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={String(hour)}>
                        {hour.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label>Minute</Label>
                <Select
                  value={selectedDateTime ? String(Math.floor(selectedDateTime.getMinutes() / 5) * 5) : ""}
                  onValueChange={handleSelectMinute}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Minute" />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={String(minute)}>
                        {minute.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
