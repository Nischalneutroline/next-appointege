"use client"
import { useFormContext } from "react-hook-form"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useState } from "react"

const tabs = ["Business Detail", "Business hour & Availability"]

const BusinessSettingsTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0])
  return (
    <div className="space-y-2">
      <ToggleGroup
        type="single"
        value={activeTab}
        className="gap-2"
        onValueChange={(v: any) => setActiveTab(v)}
      >
        {tabs.map((tab) => (
          <ToggleGroupItem
            key={tab}
            value={tab}
            className="data-[state=on]:bg-[#E98651]  data-[state=on]:border-none data-[state=on]:text-white rounded-lg border max-w-max px-2"
            style={{
              boxShadow:
                activeTab === tab ? "0px 2px 4px 0px #001F5280 inset" : "",
            }}
          >
            {tab}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

export default BusinessSettingsTabs
