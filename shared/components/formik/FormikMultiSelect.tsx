import { useField } from 'formik'
import React from 'react'
import Select from 'react-select'

interface Option {
  label: string
  value: string | number
}

interface FMKMultiSelectProps {
  name: string
  label: string
  options: Option[]
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: 'hsl(var(--popover))',
    borderColor: 'hsl(var(--border))',
    borderRadius: 'var(--radius)',
    padding: '0.2rem',
    color: 'hsl(var(--foreground))',
    '&:hover': {
      borderColor: 'hsl(var(--ring))',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: 'hsl(var(--popover))',
    color: 'hsl(var(--popover-foreground))',
    fontSize: '0.9rem',
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: 'hsl(var(--accent))',
    borderRadius: 'var(--radius)',
    color: 'hsl(var(--accent-foreground))',
    fontSize: '0.9rem',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'hsl(var(--accent-foreground))',
    padding: '0.2rem',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: 'hsl(var(--destructive))',
    ':hover': {
      borderRadius: 'var(--radius)',
    },
  }),
}

export const FMKMultiSelect: React.FC<FMKMultiSelectProps> = ({ name, label, options }) => {
  const [field, meta, helpers] = useField(name)

  const handleChange = (selectedOptions: any) => {
    helpers.setValue(selectedOptions ? selectedOptions.map((option: Option) => option.value) : [])
  }

  return (
    <div>
      <label className="text-sm font-medium"> {label}</label>
      <Select
        styles={customStyles}
        isMulti
        name={name}
        options={options}
        onChange={handleChange}
        value={options.filter((option) => field.value?.includes(option.value))}
      />
      {meta.touched && meta.error ? <div className="text-sm text-red-500">{meta.error}</div> : null}
    </div>
  )
}
