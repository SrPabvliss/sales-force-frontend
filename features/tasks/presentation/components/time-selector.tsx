import { useField } from 'formik'
import React from 'react'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export const timeOptions = [10, 20, 40, 60, 80]

interface FMKTimeSelectorProps {
  name: string
  label: string
}

const FMKTimeSelector: React.FC<FMKTimeSelectorProps> = ({ name, label }) => {
  const [field, , helpers] = useField(name)

  const handleSelectTime = (time: number) => {
    helpers.setValue(time)
  }

  return (
    <div className=" flex w-full flex-col space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex w-full gap-1 p-1 text-center text-sm font-medium">
        {timeOptions.map((time) => (
          <Card
            key={time}
            onClick={() => handleSelectTime(time)}
            className={`cursor-pointer  ${field.value === time ? 'bg-primary text-white' : 'bg-transparent'}`}
          >
            <CardHeader>
              <CardTitle className="text-sm font-medium">{time} min</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FMKTimeSelector
