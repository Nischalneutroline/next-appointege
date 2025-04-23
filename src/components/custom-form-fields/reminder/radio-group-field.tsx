"use client"

import { useFormContext } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface RadioGroupFieldProps {
  name: string
  label: string
  options: string[]
  className?: string
  icon?: LucideIcon
}

const RadioGroupField = ({
  name,
  label,
  options,
  className,
  icon: Icon,
}: RadioGroupFieldProps) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col gap-1", className)}>
          <div className="flex gap-1">
            {Icon && <Icon className="size-4 text-gray-500" />}
            <FormLabel>{label}</FormLabel>
          </div>
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex gap-4 flex-wrap"
            >
              {options.map((option) => (
                <div key={option} className="flex   items-center gap-2">
                  <RadioGroupItem value={option} id={option} />
                  <FormLabel htmlFor={option}>{option}</FormLabel>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default RadioGroupField
