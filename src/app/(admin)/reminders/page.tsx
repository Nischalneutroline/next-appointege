"use client"
import { useState } from "react"
import Heading from "@/components/admin/heading"
import { CalendarDays } from "lucide-react"
import Breadcrumbs from "@/components/shared/bread-crumb"
import PageTabs from "@/features/business-detail/components/page-tabs"
import { Card } from "@/components/ui/card"
import ReminderForm from "@/components/custom-form-fields/reminder/reminder-form"
import AnnouncementForm from "@/features/reminder/components/announcment/announcement-form"
import CardWrapper from "@/components/shared/card-wrapper"

const ReminderPage = () => {
  const [activeTab, setActiveTab] = useState("Reminder")

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
      <CardWrapper>
        <PageTabs
          isReminder
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
        {activeTab === "Reminder" ? <ReminderForm /> : <AnnouncementForm />}
      </CardWrapper>
    </main>
  )
}

export default ReminderPage
