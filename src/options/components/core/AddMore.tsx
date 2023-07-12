import { PlusCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function AddMore({ onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className="font-semibold text-primary_text w-full text-lg space-x-2 flex items-center justify-end text-right"
    >
      <span>{label}</span>
      <span>
        <PlusCircleIcon className="h-5 w-5" />
      </span>
    </button>
  )
}
