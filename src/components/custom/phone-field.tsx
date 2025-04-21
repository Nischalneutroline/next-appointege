// components/custom/phone-field.tsx
"use client"

import { useController, useFormContext } from "react-hook-form"
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface PhoneFieldProps {
  name: string
  label?: string
  placeholder?: string
  className?: string
}

const PhoneField = ({
  name,
  label,
  className,
  placeholder,
}: PhoneFieldProps) => {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <div className={cn("space-y-1", className)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <PhoneInput
        defaultCountry="np"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputClassName={cn(
          "w-full h-10 px-12 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        )}
      />
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  )
}

export default PhoneField
