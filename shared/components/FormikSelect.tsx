import { useField, FieldHookConfig } from 'formik'
import React, { ReactNode, SelectHTMLAttributes } from 'react'

import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FMKSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  placeholder?: string
  children: ReactNode
}

export const FMKSelect: React.FC<FMKSelectProps> = ({ label, children, ...props }) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<string>)
  return (
    <div className="form-group">
      <Label htmlFor={props.name}>{label}</Label>
      <Select onValueChange={(value) => helpers.setValue(value)} value={field.value}>
        <SelectTrigger className="w-full max-w-xs">
          <SelectValue placeholder={props.placeholder || 'Select an option'} />
        </SelectTrigger>
        <SelectContent className="z-50">
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {children}
          </SelectGroup>
        </SelectContent>
      </Select>
      {meta.touched && meta.error ? <div className="text-sm text-red-500">{meta.error}</div> : null}
    </div>
  )
}
