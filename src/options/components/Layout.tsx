import React from 'react'
import Form from './generic/Form'
import Tabs from './Tabs'

export default function Layout() {
  return (
    <div className="flex bg-custom_white flex-col items-center min-h-screen">
      <div className='mt-14 mb-8'>
      <Tabs />
      </div>
      <Form />
    </div>
  )
}
