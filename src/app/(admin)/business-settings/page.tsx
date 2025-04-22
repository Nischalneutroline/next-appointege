import Heading from "@/components/admin/heading"
import { CalendarDays } from "lucide-react"
import AppointmentForm from "@/features/appointment/components/admin/form/appointment-form"
import Breadcrumbs from "@/components/shared/bread-crumb"
import BusinessSettingsTabs from "@/features/business-detail/components/business-tabs"
import { Card } from "@/components/ui/card"
import BusinessSettingsForm from "@/features/business-detail/components/business-avaialability-form"

const BusinessPage = () => {
  return (
    <main className="h-full flex flex-col">
      <Breadcrumbs />
      <div>
        <Heading
          title="Business Settings"
          description="Manage and Customize your business"
          icon={<CalendarDays />}
        />
      </div>
      {/* Scrollable Form Container */}
      {/* <div className="flex-1 p-4 lg:p-6 bg-white rounded-lg shadow-xl overflow-y-auto"> */}
      <Card className="h-full overflow-y-auto p-4 md:p-6">
        <BusinessSettingsTabs />
        <BusinessSettingsForm />
      </Card>
      {/* </div> */}
    </main>
  )
}

export default BusinessPage
