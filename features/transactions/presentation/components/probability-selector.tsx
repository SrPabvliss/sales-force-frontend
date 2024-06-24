import { useField } from 'formik'
import React from 'react'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export const timeOptions = [25, 50, 75, 100]

interface FMKTimeSelectorProps {
  name: string
  label: string
}

const FMKProbabilitySelector: React.FC<FMKTimeSelectorProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField(name)

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
              <CardTitle className="text-sm font-medium">{time} %</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      {meta.touched && meta.error ? <div className="text-sm text-red-500">{meta.error}</div> : null}
    </div>
  )
}

export default FMKProbabilitySelector
