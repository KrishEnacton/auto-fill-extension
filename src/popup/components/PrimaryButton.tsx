import React from 'react'

export default function PrimaryButton({ customClass, text, onClick }: any) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className={
          'rounded-lg h-[35px] w-[215px] text-sm font-bold shadow-sm outline-none ' +
          `${customClass}`
        }
      >
        {text}
      </button>
    </div>
  )
}
