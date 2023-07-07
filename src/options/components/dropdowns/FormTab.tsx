import React from 'react'

const tabs = [
  {
    id: 1,
    name: 'Item one',
  },
  {
    id: 2,
    name: 'Item one',
  },
  {
    id: 3,
    name: 'Item one',
  },
  {
    id: 4,
    name: 'Item one',
  },
  {
    id: 5,
    name: 'Item one',
  },
]
export default function FormTab() {
  return (
    <div>
      {tabs.map((elem) => (
        <div key={elem.id}>{elem.name}</div>
      ))}
    </div>
  )
}
