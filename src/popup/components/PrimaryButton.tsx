import React from 'react'

export default function PrimaryButton({customClass, text}:any) {
  return (
    <div>
      <button
        type="button"
        className={"rounded-lg h-[30px]  w-[177px] text-xs font-bold shadow-sm outline-none " +   `${customClass}`}
      >
       {text}
      </button>
    </div>
  )
}
