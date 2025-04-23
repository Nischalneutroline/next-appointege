import React from "react"
import { Card } from "../ui/card"

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="p-4 lg:p-6 h-full overflow-y-auto overflow-x-hidden">
      {children}
    </Card>
  )
}

export default CardWrapper
