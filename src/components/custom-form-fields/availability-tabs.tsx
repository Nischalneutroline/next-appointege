import { useFormContext } from "react-hook-form"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const AvailabilityTabs = ({ name }: { name: string }) => {
  const { watch, setValue } = useFormContext()
  const value = watch(name)

  return (
    <div className="space-y-2">
      <Label>Availability</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v: any) => v && setValue(name, v)}
        className="gap-2"
      >
        <ToggleGroupItem
          value="default"
          className="data-[state=on]:bg-[#E98651]  data-[state=on]:border-none data-[state=on]:text-white rounded-lg border px-4"
          style={{
            boxShadow:
              value === "default" ? "0px 2px 4px 0px #001F5280 inset" : "",
          }}
        >
          Default
        </ToggleGroupItem>
        <ToggleGroupItem
          value="custom"
          className="data-[state=on]:bg-[#E98651] data-[state=on]:inset-shadow-sm data-[state=on]:border-none data-[state=on]:text-white rounded-lg border px-4"
          style={{
            boxShadow:
              value === "custom" ? "0px 2px 4px 0px #001F5280 inset" : "",
          }}
        >
          Custom
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default AvailabilityTabs
