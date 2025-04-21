// app/(admin)/appointment-form.tsx
"use client"

import { useForm, FormProvider } from "react-hook-form"
import InputField from "@/components/custom/input-field"
import SelectField from "@/components/custom/select-field"
import TextAreaField from "@/components/custom/textarea-field"
import DatePickerField from "@/components/custom/date-field"
import PhoneInputField from "@/components/custom/phone-field"
import TimePickerField from "@/components/custom/time-field"
import { Button } from "@/components/ui/button"
import FormHeader from "@/components/admin/form-header"
import { useRouter } from "next/navigation"

const serviceOptions = [
  { label: "Consultation", value: "consultation" },
  { label: "Haircut", value: "haircut" },
  { label: "Massage", value: "massage" },
]

const availableTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
]

const AppointmentForm = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      date: undefined,
      time: "",
      message: "",
    },
  })

  const router = useRouter()

  const onSubmit = (data: any) => {
    console.log("Appointment Form Submitted:", data)
    // Here you can handle the appointment submission, for example, API calls
  }

  const handleBack = () => {
    router.push("/admin/appointments") // Adjust to your back navigation path
  }

  return (
    <>
      <FormHeader
        title="Enter Appointment Details"
        description="View and manage your upcoming appointments"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="firstName"
              label="First Name"
              placeholder="John"
            />
            <InputField name="lastName" label="Last Name" placeholder="Doe" />
          </div>

          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
          />

          <PhoneInputField
            name="phone"
            label="Phone Number"
            placeholder="Enter your number"
          />

          <SelectField
            name="service"
            label="Select a Service"
            options={serviceOptions}
          />

          <div className="grid grid-cols-2 gap-4">
            <DatePickerField
              name="date"
              label="Appointment Date"
              placeholder="Pick a date"
            />
            <TimePickerField
              name="time"
              label="Appointment Time"
              availableTimeSlots={availableTimeSlots}
            />
          </div>

          <TextAreaField
            name="message"
            label="Additional Notes"
            placeholder="Any special requests?"
          />

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto hover:opacity-95 active:translate-y-0.5 transition-transform duration-200"
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto hover:opacity-95 active:translate-y-0.5 transition-transform duration-200"
            >
              Book Appointment
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AppointmentForm
