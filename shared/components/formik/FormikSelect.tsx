'use client'

import { useField, FieldHookConfig } from 'formik'
import React, { SelectHTMLAttributes } from 'react'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Option {
  label: string
  value: string
}

interface FMKSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  placeholder?: string
  options: Option[]
}

export const FMKSelect: React.FC<FMKSelectProps> = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<string>)
  return (
    <div className="form-group w-full">
      <Label htmlFor={props.name}>{label}</Label>
      <div className="w-full">
        <Select onValueChange={(value) => helpers.setValue(value)} value={field.value}>
          <SelectTrigger className="w-full ">
            <SelectValue placeholder={props.placeholder || 'Select an option'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {options.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {meta.touched && meta.error ? <div className="text-sm text-red-500">{meta.error}</div> : null}
    </div>
  )
}
