import React from 'react'

export default function Checkbox({ label }: any) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={label}
          aria-describedby="comments-description"
          name={label}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-base focus:ring-base"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={label} className="cursor-pointer font-medium text-gray-900">
          {label}
        </label>
      </div>
    </div>
  )
}
