import React from 'react'

export default function Checkbox({ label, value, onChange }: any) {
  return (
    <div className="relative my-5 flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={label}
          aria-describedby="comments-description"
          name={label}
          checked={value}
          onChange={onChange}
          type="checkbox"
          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-base focus:ring-base"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label
          htmlFor={label}
          className="block cursor-pointer text-left text-lg font-bold leading-6 text-gray-800"
        >
          {label}
        </label>
      </div>
    </div>
  )
}
