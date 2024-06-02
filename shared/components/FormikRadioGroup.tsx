'use client'

import { useField, FieldHookConfig } from 'formik'
import React from 'react'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface FMKRadioGroupProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  name: string
  options: { label: string; value: string }[]
}

export const FMKRadioGroup: React.FC<FMKRadioGroupProps> = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<string>)

  const handleChange = (value: string) => {
    helpers.setValue(value)
  }

  return (
    <div className="flex flex-col gap-1 py-2">
      <Label>{label}</Label>
      <RadioGroup value={field.value} onValueChange={handleChange}>
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${props.name}-${index}`} />
            <Label htmlFor={`${props.name}-${index}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {meta.touched && meta.error ? <div className="text-sm text-red-500">{meta.error}</div> : null}
    </div>
  )
}
