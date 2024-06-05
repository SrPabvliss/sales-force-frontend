'use client'

import { useField, FieldHookConfig } from 'formik'
import React, { InputHTMLAttributes } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FMKInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export const FMKInput: React.FC<FMKInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props as FieldHookConfig<any>)
  return (
    <div>
      <Label htmlFor={props.name}>{label}</Label>
      <Input {...field} {...props} className={meta.touched && meta.error ? 'border-2 border-red-500' : ''} />
      {meta.touched && meta.error ? <div className="text-sm text-red-500">{meta.error}</div> : null}
    </div>
  )
}
