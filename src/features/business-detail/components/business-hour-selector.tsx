"use client"

import { useFormContext } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CalendarDays, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

// Days to show as toggleable tabs
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// Available time options for slots
const timeOptions = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
]

const BusinessHourSelector = ({ name }: { name: string }) => {
  const { watch, setValue } = useFormContext()

  const businessDays = watch("businessDays") || []
  const holidays = watch("holidays") || []
  const businessHours = watch(name) || {}

  const [activeDay, setActiveDay] = useState(businessDays[0] || "")

  // Helper to exclude overlapping times with break hours
  const getFilteredTimeOptions = (
    day: string,
    excludeRanges: [string, string][]
  ) => {
    const result: string[] = []

    timeOptions.forEach((time) => {
      const isOverlapping = excludeRanges.some(([start, end]) => {
        return time >= start && time < end
      })
      if (!isOverlapping) result.push(time)
    })

    return result
  }

  // Filter time based on previous end and break overlaps
  const getAvailableTimes = (
    afterTime: string | undefined,
    excludeRanges: [string, string][],
    isEnd = false
  ) => {
    const base = getFilteredTimeOptions(activeDay, excludeRanges)
    if (!afterTime) return base

    const index = base.indexOf(afterTime)
    return isEnd ? base.slice(index + 1) : base.slice(index)
  }

  const handleChange = (
    day: string,
    index: number,
    type: "work" | "break",
    position: "start" | "end",
    newVal: string
  ) => {
    const updated = { ...businessHours }
    const slots = [...(updated[day]?.[type] || [])]
    const current = slots[index] || ["", ""]

    if (position === "start") current[0] = newVal
    else current[1] = newVal

    slots[index] = current
    updated[day] = {
      ...updated[day],
      [type]: slots,
    }
    setValue(name, updated)
  }

  const addSlot = (day: string, type: "work" | "break") => {
    const updated = { ...businessHours }
    const slots = [...(updated[day]?.[type] || [])]
    const prevEnd = slots[slots.length - 1]?.[1] || ""
    slots.push([prevEnd, ""])
    updated[day] = {
      ...updated[day],
      [type]: slots,
    }
    setValue(name, updated)
  }

  const removeSlot = (day: string, type: "work" | "break", index: number) => {
    const updated = { ...businessHours }
    updated[day][type] = updated[day][type].filter(
      (_: any, i: number) => i !== index
    )
    setValue(name, updated)
  }

  return (
    <div className="space-y-6">
      <Label>Business Hours / Day</Label>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <CalendarDays className="size-5" />
        <div className="flex gap-2 flex-wrap">
          {businessDays
            .filter((day: string) => !holidays.includes(day))
            .map((day: string) => (
              <Button
                key={day}
                type="button"
                variant={activeDay === day ? "default" : "outline"}
                onClick={() => setActiveDay(day)}
                className={cn(
                  "px-4 min-w-[72px]",
                  activeDay === day &&
                    "shadow-[inset_0px_2px_4px_0px_#001F5280]"
                )}
              >
                {day}
              </Button>
            ))}
        </div>
      </div>

      {/* Work + Break Slot Forms */}
      {["work", "break"].map((type) => {
        const isWork = type === "work"
        const typeLabel = isWork ? "Work Hours" : "Break Hours"
        const icon = isWork ? "🛠️" : "☕"
        const slots = businessHours[activeDay]?.[type] || []
        const breakRanges = businessHours[activeDay]?.["break"] || []
        return (
          <div key={type} className="space-y-2">
            <Label>
              {icon} {typeLabel}
            </Label>
            <div className="space-y-3">
              {slots.map((slot: [string, string], idx: number) => {
                const availableStarts = getAvailableTimes(
                  idx > 0 ? slots[idx - 1]?.[1] : undefined,
                  isWork ? breakRanges : []
                )
                const availableEnds = getAvailableTimes(
                  slot[0],
                  isWork ? breakRanges : [],
                  true
                )
                return (
                  <div key={idx} className="flex gap-4 items-center">
                    <Select
                      value={slot[0]}
                      onValueChange={(val) =>
                        handleChange(activeDay, idx, type as any, "start", val)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Start" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableStarts.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={slot[1]}
                      onValueChange={(val) =>
                        handleChange(activeDay, idx, type as any, "end", val)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="End" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableEnds.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {idx > 0 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeSlot(activeDay, type as any, idx)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                )
              })}
              <Button
                type="button"
                onClick={() => addSlot(activeDay, type as any)}
                variant="outline"
                className="text-xs gap-1"
              >
                <Plus className="w-3 h-3" /> Add {typeLabel} Slot
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BusinessHourSelector
