import Heading from "@/components/admin/heading"
import { HandPlatter } from "lucide-react"
import Breadcrumbs from "@/components/shared/bread-crumb"
import CustomerForm from "@/features/customer/components/customer-form"
import { Card } from "@/components/ui/card"
import CardWrapper from "@/components/shared/card-wrapper"

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
        <CustomerForm />
      </CardWrapper>
    </main>
  )
}

export default ServicePage
