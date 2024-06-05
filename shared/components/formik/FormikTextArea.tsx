'use client'

import { useField, FieldHookConfig } from 'formik'
import React, { TextareaHTMLAttributes } from 'react'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface FMKTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
}

export const FMKTextarea: React.FC<FMKTextareaProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props as FieldHookConfig<string>)

  return (
    <div>
      <Label htmlFor={props.name}>{label}</Label>
      <Textarea
        {...field}
        {...props}
        className={`form-textarea ${meta.touched && meta.error ? 'border-2 border-red-500' : ''}`}
      />
      {meta.touched && meta.error ? <div className="text-sm text-red-500">{meta.error}</div> : null}
    </div>
  )
}
