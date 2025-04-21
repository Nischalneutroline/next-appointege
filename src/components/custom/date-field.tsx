// components/custom/date-picker-field.tsx
"use client"

import { format, addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

interface Props {
  name: string
  label?: string
  placeholder?: string
  minDate?: Date
  maxDate?: Date
}

const DatePickerField = ({
  name,
  label = "Select Date",
  placeholder = "Pick a date",
  minDate = new Date(),
  maxDate = addDays(new Date(), 30), // default: today to 30 days later
}: Props) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-2">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < minDate || date > maxDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DatePickerField
