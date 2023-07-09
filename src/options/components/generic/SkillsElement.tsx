import React from 'react'

export default function SkillsElement({ item }: any) {
  return (
    <button className="text-sm py-3 px-4 w-full rounded-lg ring-1 ring-inset ring-gray-300">
      {item}
    </button>
  )
}
