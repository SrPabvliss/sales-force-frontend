'use client'

import { useField, FieldHookConfig } from 'formik'
import React, { InputHTMLAttributes } from 'react'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface FMKSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export const FMKSwitch: React.FC<FMKSwitchProps> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<any>)

  return (
    <div className="flex items-center space-x-2">
      <Switch id={props.name} checked={field.value} onCheckedChange={(value) => helpers.setValue(value)} />
      <Label htmlFor={props.name}>{label}</Label>
      {meta.touched && meta.error ? <div className="text-sm text-red-500">{meta.error}</div> : null}
    </div>
  )
}
