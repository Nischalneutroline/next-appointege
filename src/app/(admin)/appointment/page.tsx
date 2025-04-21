import Heading from "@/components/admin/heading"
import { CalendarDays } from "lucide-react"
import AppointmentForm from "@/features/appointment/components/admin/form/appointment-form"

const AdminPage = () => {
  return (
    <main className="h-full flex flex-col">
      <div>
        <Heading
          title="Create New Appointment"
          description="Schedule a new appointment"
          icon={<CalendarDays />}
        />
      </div>
      {/* Scrollable Form Container */}
      <div className="flex-1 p-4 lg:p-6 bg-white rounded-lg shadow-xl overflow-y-auto">
        <AppointmentForm />
      </div>
    </main>
  )
}

export default AdminPage
