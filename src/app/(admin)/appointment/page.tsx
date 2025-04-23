import Heading from "@/components/admin/heading"
import { CalendarDays } from "lucide-react"
import AppointmentForm from "@/features/appointment/components/admin/form/appointment-form"
import Breadcrumbs from "@/components/shared/bread-crumb"
import { Card } from "@/components/ui/card"
import PageHeader from "@/components/shared/page-header"

const AppointmentFormPage = () => {
  return (
    <main className="h-full flex flex-col">
      <PageHeader>
        <Heading
          title="Create New Customer"
          description="Create and Mange your customers"
          icon={<CalendarDays />}
        />
      </PageHeader>
      {/* Scrollable Form Container */}
      <Card className=" overflow-y-auto p-6">
        <AppointmentForm />
      </Card>
    </main>
  )
}

export default AppointmentFormPage
