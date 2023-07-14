import React, { useEffect, useState } from 'react'
import Form from './generic/Form'
import Logout from './generic/Logout'
import Tabs from './Tabs'

export default function Layout() {
  return (
    <div className="flex bg-custom_white flex-col items-center min-h-screen">
      <div className="mt-14 mb-8 flex space-x-3">
        <Tabs />
        <Logout />
      </div>
      <Form />
    </div>
  )
}
