import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ImageUploadField = ({ name, label }: any) => {
  const { register } = useFormContext()
  return (
    <div>
      <Label>{label}</Label>
      <Input type="file" accept="image/*" {...register(name)} />
    </div>
  )
}

export default ImageUploadField
