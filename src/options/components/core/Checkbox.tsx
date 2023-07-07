import React from 'react'

export default function Checkbox({ label }: any) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id="comments"
          aria-describedby="comments-description"
          name="comments"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor="comments" className="font-medium text-gray-900">
          {label}
        </label>
      </div>
    </div>
  )
}
