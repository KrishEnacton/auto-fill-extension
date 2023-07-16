import React from 'react'

export default function AppLogo() {
  return (
    <div className="flex justify-center h-[41px] w-full border border-gray-300 items-center">
      <div >
        <img className="!h-[36px] w-[108px]" src={`img/main-logo.png`} alt={`App logo`} />
      </div>
    </div>
  )
}
