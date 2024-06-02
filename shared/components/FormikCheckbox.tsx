'use client'

import { useField, FieldHookConfig } from 'formik'
import React, { InputHTMLAttributes } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface FMKCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export const FMKCheckbox: React.FC<FMKCheckboxProps> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<any>)

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={props.name} checked={field.value} onCheckedChange={(value) => helpers.setValue(value)} />
      <Label
        htmlFor={props.name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </Label>
      {meta.touched && meta.error ? <div className="text-sm text-red-500">{meta.error}</div> : null}
    </div>
  )
}
