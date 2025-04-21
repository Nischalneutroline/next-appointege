// components/custom/time-picker-field.tsx
"use client"

import { useFormContext, useController } from "react-hook-form"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

interface TimePickerFieldProps {
  name: string
  label?: string
  className?: string
  availableTimeSlots: string[] // List of available time slots
}

const TimePickerField = ({
  name,
  label,
  className,
  availableTimeSlots,
}: TimePickerFieldProps) => {
  const { control } = useFormContext()

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <div className={className}>
      <FormItem className="space-y-2">
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {availableTimeSlots.map((timeSlot, index) => (
                <SelectItem key={index} value={timeSlot}>
                  {timeSlot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        {error && <FormMessage>{error.message}</FormMessage>}
      </FormItem>
    </div>
  )
}

export default TimePickerField
