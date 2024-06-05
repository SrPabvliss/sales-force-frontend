'use client'

import { format, isBefore, isAfter } from 'date-fns'
import { useField, FieldHookConfig } from 'formik'
import { Calendar as CalendarIcon } from 'lucide-react'
import React, { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'

interface FMKDateRangePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  name: string
  minDate?: Date
  maxDate?: Date
}

export const FMKDateRangePicker: React.FC<FMKDateRangePickerProps> = ({ label, minDate, maxDate, ...props }) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<DateRange>)
  const [date, setDate] = useState<DateRange | undefined>(field.value)

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    if (selectedDate?.from && minDate && isBefore(selectedDate.from, minDate)) {
      return
    }
    if (selectedDate?.to && maxDate && isAfter(selectedDate.to, maxDate)) {
      return
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
    <div className="flex flex-col gap-1 p-1">
      <Label htmlFor={props.name}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            disabled={isDateDisabled}
          />
        </PopoverContent>
      </Popover>
      {meta.touched && meta.error ? <div className="text-sm text-red-500">{meta.error}</div> : null}
    </div>
  )
}
