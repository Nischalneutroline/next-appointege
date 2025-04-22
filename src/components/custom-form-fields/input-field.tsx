"use client"

import { Input } from "@/components/ui/input"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils" // Make sure this is a utility to merge classNames

interface InputFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: string
  className?: string // Allow custom class styling
  icon?: React.ReactNode
}

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  icon,
  className,
}: InputFieldProps) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex gap-2">
            <span>{icon}</span>
            <FormLabel>{label}</FormLabel>
          </div>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className={cn("w-full", className)} // Merge custom and default classes
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputField
