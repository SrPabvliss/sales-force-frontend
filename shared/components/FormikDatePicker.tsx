'use client'

import { format, isBefore, isAfter } from 'date-fns'
import { useField, FieldHookConfig } from 'formik'
import { Calendar as CalendarIcon } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'

interface FMKDatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  name: string
  minDate?: Date
  maxDate?: Date
}

export const FMKDatePicker: React.FC<FMKDatePickerProps> = ({ label, minDate, maxDate, ...props }) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<Date>)
  const [date, setDate] = useState<Date | undefined>(field.value)

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      if ((minDate && isBefore(selectedDate, minDate)) || (maxDate && isAfter(selectedDate, maxDate))) {
        return
      }
    }
    setDate(selectedDate)
    selectedDate && helpers.setValue(selectedDate)
  }

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && isBefore(date, minDate)) {
      return true
    }
    if (maxDate && isAfter(date, maxDate)) {
      return true
    }
    return false
  }

  return (
    <div className="flex flex-col gap-1 py-1">
      <Label htmlFor={props.name}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus disabled={isDateDisabled} />
        </PopoverContent>
      </Popover>
      {meta.touched && meta.error ? <div className="text-sm text-red-500">{meta.error}</div> : null}
    </div>
  )
}
