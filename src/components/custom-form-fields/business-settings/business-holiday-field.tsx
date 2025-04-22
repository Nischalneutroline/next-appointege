"use client"

import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// Holiday Selector
const HolidayField = ({ name, disableFieldName }: any) => {
  const { watch, setValue } = useFormContext()
  const selected = watch(name) || []
  const businessDays = watch(disableFieldName) || []

  const toggle = (day: string) => {
    const updated = selected.includes(day)
      ? selected.filter((d: string) => d !== day)
      : [...selected, day]
    setValue(name, updated)
    // Remove from businessDays if added to holiday
    setValue(
      disableFieldName,
      businessDays.filter((d: string) => !updated.includes(d))
    )
  }

  return (
    <div className="space-y-1">
      <Label>Holiday</Label>
      <div className="flex gap-2 flex-wrap">
        {days.map((day) => (
          <Button
            key={day}
            type="button"
            onClick={() => toggle(day)}
            variant={selected.includes(day) ? "destructive" : "outline"}
            className="min-w-[60px]"
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default HolidayField
