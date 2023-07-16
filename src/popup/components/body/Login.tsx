import React from 'react'

export default function Login() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="text-base font-bold text-center text-[12px] mt-6"> Welcome to AutoFill</div>
      <div className="w-[190px] text-center mt-4 mb-7 text-[15px] font-semibold leading-4">
        Quickly complete job applications with saved information
      </div>
      <div className=" text-center my-4 text-[12px] font-bold">Login/Sign Up</div>
      <div className="flex space-x-3">
        <button>
          <img src={`img/google.svg`} alt={`google Icon`} />
        </button>
        <button>
          <img src={`img/linkedin.svg`} alt={`linkedin Icon`} />
        </button>
      </div>
    </div>
  )
}
