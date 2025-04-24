"use client"

import { useForm, FormProvider } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import InputField from "@/components/custom-form-fields/input-field"
import TextAreaField from "@/components/custom-form-fields/textarea-field"
import ImageUploadField from "@/components/custom-form-fields/image-upload"
import AvailabilityTabs from "@/components/custom-form-fields/availability-tabs"
import ServiceDaySelector from "@/components/custom-form-fields/serivce/service-day-selector"
import ServiceHoursSelector from "@/components/custom-form-fields/serivce/service-hours-selector"
import ToggleSwitch from "@/components/custom-form-fields/toggle-switch"
import DurationSelect from "@/components/custom-form-fields/duration-select"
import { CalendarClock, ImageUp, ScrollText, UserRoundCog } from "lucide-react"
import { Toaster } from "sonner"

// Business availability data
export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
export const businessAvailability = {
  Mon: {
    break: [
      ["12:00 PM", "01:00 PM"],
      ["02:00 PM", "03:00 PM"],
      ["04:00 PM", "05:00 PM"],
    ],
  },
  Tue: { break: [["02:00 PM", "04:00 PM"]] },
  Wed: { break: [] },
  Thu: { break: [] },
  Fri: { break: [] },
  Sat: { break: [] },
  Sun: { break: [] },
} satisfies Record<WeekDay, { break: [string, string][] }>

const defaultServiceHours = {
  Mon: [["09:00 AM", "05:00 PM"]],
  Tue: [["09:00 AM", "05:00 PM"]],
  Wed: [["09:00 AM", "05:00 PM"]],
  Thu: [["09:00 AM", "05:00 PM"]],
  Fri: [["09:00 AM", "05:00 PM"]],
  Sat: [["09:00 AM", "05:00 PM"]],
  Sun: [["09:00 AM", "05:00 PM"]],
}

export default function ServiceForm() {
  const form = useForm({
    defaultValues: {
      serviceName: "",
      description: "",
      image: null,
      availabilityMode: "default",
      serviceDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      serviceHours: defaultServiceHours,
      isAvailable: true,
      duration: "",
    },
  })

  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data)
  }

  return (
    <FormProvider {...form}>
      <Toaster position="top-right" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="">
          <div className="space-y-6">
            <InputField
              name="serviceName"
              label="Service Name"
              icon={UserRoundCog}
            />
            <TextAreaField
              name="description"
              label="Description"
              icon={ScrollText}
            />
            <ImageUploadField
              name="image"
              label="Cover Picture"
              icon={ImageUp}
            />
            <AvailabilityTabs name="availabilityMode" icon={CalendarClock} />
            <ServiceDaySelector name="serviceDays" />
            <ServiceHoursSelector
              name="serviceHours"
              businessBreaks={businessAvailability}
            />
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <ToggleSwitch name="isAvailable" label="Availability" />
              <DurationSelect name="duration" label="Duration:" />
            </div>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
