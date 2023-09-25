import React from 'react'
import ButtonWithText from '../ButtonWithText'

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-[220px] h-[150px] text-center mb-2 mt-10  text-[18px] font-semibold leading-5">
        Quickly complete job applications with saved information
      </div>
      <div className="space-y-11">
        <ButtonWithText
          msg={'simply dummy text of the printing and typesetting industry.'}
          buttonText={'Lorem Epsum'}
          customClass="!bg-secondary_button !hover:bg-secondary_button/80 text-gray-800"
        />
        <ButtonWithText
          msg={'simply dummy text of the printing and typesetting industry.'}
          buttonText={'Lorem Epsum'}
          customClass="!bg-primary_button !hover:bg-primary_button/80 text-primary_text"
        />
      </div>
    </div>
  )
}
