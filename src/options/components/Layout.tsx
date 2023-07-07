import React from 'react'
import Form from './generic/Form'
import Tabs from './Tabs'

export default function Layout() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Tabs />
      <Form />
    </div>
  )
}
