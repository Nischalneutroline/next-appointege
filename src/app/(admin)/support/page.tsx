"use client"

import { useState } from "react"
import PageTabs from "@/features/business-detail/components/page-tabs"
import { Card } from "@/components/ui/card"
import ContactInformationForm from "@/features/help-support/components/contact-info"
import FAQSection from "@/features/help-support/components/faq"
import AdminSupportForm from "@/features/help-support/components/admin-support"
import Breadcrumbs from "@/components/shared/bread-crumb"
import Heading from "@/components/admin/heading"
import { UserCog } from "lucide-react"

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState("Contact Information")

  const tabs = [
    "Contact Information",
    "Frequently Asked Questions (FAQs)",
    "Admin Support",
  ]
  const mTabs = ["Contact", "FAQs", "Support"]

  // Map mobile tab values to desktop tab values
  const tabMapping: { [key: string]: string } = {
    Contact: "Contact Information",
    FAQs: "Frequently Asked Questions (FAQs)",
    Support: "Admin Support",
  }

  const handleTabChange = (tab: string) => {
    // If the tab is a mobile tab, map it to the corresponding desktop tab
    const mappedTab = tabMapping[tab] || tab
    setActiveTab(mappedTab)
  }

  return (
    <div>
      <Breadcrumbs />
      <div>
        <Heading
          title="Support"
          description="Manage your support and customer service"
          icon={<UserCog />}
        />
      </div>
      <Card className="h-full overflow-y-auto p-4 md:p-6">
        <PageTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          customTabs={tabs}
          clasName="hidden md:block"
        />
        <PageTabs
          activeTab={mTabs[tabs.indexOf(activeTab)] || "Contact"} // Map desktop activeTab to mobile tab
          onTabChange={handleTabChange}
          customTabs={mTabs}
          clasName="block md:hidden"
        />
        {activeTab === "Contact Information" && <ContactInformationForm />}
        {activeTab === "Frequently Asked Questions (FAQs)" && <FAQSection />}
        {activeTab === "Admin Support" && <AdminSupportForm />}
      </Card>
    </div>
  )
}

export default SupportPage
