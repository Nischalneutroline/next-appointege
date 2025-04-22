import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form"

const ToggleSwitch = ({ name, label }: any) => {
  const { watch, setValue } = useFormContext()
  return (
    <div className="flex items-center gap-4 w-full">
      <Label>{label}</Label>
      <Switch
        checked={watch(name)}
        onCheckedChange={(val: any) => setValue(name, val)}
      />
    </div>
  )
}

export default ToggleSwitch
