import React from 'react'
import PrimaryButton from './PrimaryButton'

export default function ButtonWithText({ msg, buttonText, customClass }: any) {
  return (
    <div className='flex items-center justify-center w-full text-[11px]'>
      <div className="w-[211px] py-2 px-3 pb-3 border border-gray-300 rounded space-y-3">
        <div>{msg}</div>
        <PrimaryButton text={buttonText} customClass={customClass} />
      </div>
    </div>
  )
}
