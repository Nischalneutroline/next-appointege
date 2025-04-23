import Heading from "@/components/admin/heading"
import { HandPlatter } from "lucide-react"
import Breadcrumbs from "@/components/shared/bread-crumb"
import CustomerForm from "@/features/customer/components/customer-form"
import { Card } from "@/components/ui/card"
import CardWrapper from "@/components/shared/card-wrapper"
import ServiceForm from "@/features/service/components/admin/service-form"

const ServicePage = () => {
  return (
    <main className="h-full flex flex-col">
      <Breadcrumbs />
      <div>
        <Heading
          title="Create New Customer"
          description="Manage and View your customers"
          icon={<HandPlatter />}
        />
      </div>
      {/* Scrollable Form Container */}
      <CardWrapper>
        <ServiceForm />
      </CardWrapper>
    </main>
  )
}

export default ServicePage
