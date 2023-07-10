import React from 'react'
import CrossIcon from '@heroicons/react/24/outline/XMarkIcon'
const Popup: React.FC<{}> = () => {
  return (
    <div
      style={{
        position: 'fixed',
        right: 10,
        top: 70,
        background: '#F6F7FA',
        border: '1px solid black',
        borderRadius: 5,
        zIndex: 10001,
      }}
    >
      <div className="flex flex-col p-2 gap-y-6 my-5">
        <div className="flex px-6 justify-between">
          <div className="flex">
            <img src={chrome.runtime.getURL('/src/assets/logo.png')} alt="Logo" />
          </div>
          <button className="flex items-end">
            <CrossIcon className="h-14 w-14" />
          </button>
        </div>
        <div className="px-4">Quickly complete job applications with saved information!</div>
        <div className="flex justify-center">
          <button className=" px-4 py-2 bg-base text-base_text rounded-md">AUTOFILL</button>
        </div>
      </div>
    </div>
  )
}

export default Popup
